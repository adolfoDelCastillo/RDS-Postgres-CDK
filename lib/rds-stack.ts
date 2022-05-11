import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from "aws-cdk-lib/core";
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Ec2Action } from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { SubnetType, Vpc, ISubnet } from 'aws-cdk-lib/aws-ec2';

// import * as sqs from 'aws-cdk-lib/aws-sqs';
  


export class RdsStack extends Stack {
  
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    const vpc = new ec2.Vpc(this, 'TheVPC', {
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 26,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 26,
          name: 'Application1',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
        },
        {
          cidrMask: 26,
          name: 'Application2',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
          reserved: true,   // <---- This subnet group is reserved
        },
        {
          cidrMask: 27,
          name: 'Database',
          subnetType: ec2.SubnetType.ISOLATED,
        }
      ],
    });
    
    const engine = rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_12_10 });

    /*
    const engine = rds.DatabaseClusterEngine.auroraPostgres({
      version: rds.AuroraPostgresEngineVersion.VER_12_8, // postgres version 12.8
    });
    */

    const defaultVpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', { isDefault: true });
    const instance = new rds.DatabaseInstance(this, 'Instance', {
      engine,//: rds.DatabaseInstanceEngine.postgres({version: rds.PostgresEngineVersion.VER_12_10}),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.SMALL),
      vpc: defaultVpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      publiclyAccessible: true,
      maxAllocatedStorage: 200,
    });

  }
}
