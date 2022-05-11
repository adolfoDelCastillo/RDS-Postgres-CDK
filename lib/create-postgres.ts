import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import { Secret } from '@aws-cdk/aws-secretsmanager';


interface Stack2Props extends cdk.StackProps {
    envName: string;
    instanceClass?: ec2.InstanceClass,
    instanceSize?: ec2.InstanceSize,
}

export class CreatePostgresInstanceStack extends cdk.Stack {
    public readonly cluster: rds.DatabaseCluster;
    public readonly rdsInstance: rds.DatabaseInstance;
    constructor(scope: cdk.Construct, id: string, props: Stack2Props) {
        super(scope, id, props);


      const size = props?.instanceSize || ec2.InstanceSize.SMALL;
      const instanceClass = props?.instanceClass || ec2.InstanceClass.BURSTABLE2;

      const instanceType = ec2.InstanceType.of(instanceClass, size);

      const vpc = ec2.Vpc.fromLookup(
          this,
          "Default VPC",
          {
              isDefault: true,
          }
      );

      const securityGroups = new ec2.SecurityGroup(
          this,
          `${props?.envName}-PostgresDB-SG`,
          {
              vpc,
          });

        securityGroups.addIngressRule(
            securityGroups,
            ec2.Port.tcp(5432), 
            'allow 5432 access from my IP'
        );

       
       const databaseCredentialsSecret = new Secret(
           this,
           `${props?.envName}-PostgresDB-Secret`, {
            secretName: `${props?.envName}-PostgresDB-Credentials`,
            generateSecretString: {
                secretStringTemplate: JSON.stringify({
                    username: 'postgres',
                }),
                excludePunctuation: true,
                includeSpace: false,
                generateStringKey: 'password',
            }
           });

        const credentials = rds.Credentials.fromSecret(databaseCredentialsSecret);

        const removalPolicy = cdk.RemovalPolicy.DESTROY;
        
        const storageEncrypted = true;


    // finally, lets configure and create our database!
    const rdsConfig: rds.DatabaseInstanceProps = {
        engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_12_10 }),
        // optional, defaults to m5.large
        instanceType: instanceType,
        vpc: vpc,
        // make the db publically accessible
        vpcSubnets: {
          subnetType: ec2.SubnetType.PUBLIC,
        },
        instanceIdentifier: `${props?.envName}-PostgresDB-Instance`,
        maxAllocatedStorage: 200,
        securityGroups: [securityGroups],
        credentials,
        removalPolicy,
        storageEncrypted,
      }
  
      // create the instance
      this.rdsInstance = new rds.DatabaseInstance(this, `${props?.envName}-PostgreDB-Instance`, rdsConfig);
  
      this.rdsInstance.connections.allowDefaultPortFromAnyIpv4();

      new cdk.CfnOutput(this, 'RDS Endpoint', { value: this.rdsInstance.dbInstanceEndpointAddress });     

    }
}