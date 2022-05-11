"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RdsStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const rds = require("aws-cdk-lib/aws-rds");
const ec2 = require("aws-cdk-lib/aws-ec2");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class RdsStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
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
                    reserved: true,
                },
                {
                    cidrMask: 27,
                    name: 'Database',
                    subnetType: ec2.SubnetType.ISOLATED,
                }
            ],
        });
        const instance = new rds.DatabaseInstance(this, 'Instance', {
            engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_12_10 }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.SMALL),
            vpc,
            publiclyAccessible: true,
            maxAllocatedStorage: 200,
        });
    }
}
exports.RdsStack = RdsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmRzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmRzLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUdoRCwyQ0FBMkM7QUFFM0MsMkNBQTJDO0FBRzNDLDhDQUE4QztBQUk5QyxNQUFhLFFBQVMsU0FBUSxtQkFBSztJQUVqQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBR3hCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ3RDLFdBQVcsRUFBRSxDQUFDO1lBQ2QsbUJBQW1CLEVBQUU7Z0JBQ25CO29CQUNFLFFBQVEsRUFBRSxFQUFFO29CQUNaLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07aUJBQ2xDO2dCQUNEO29CQUNFLFFBQVEsRUFBRSxFQUFFO29CQUNaLElBQUksRUFBRSxjQUFjO29CQUNwQixVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7aUJBQzVDO2dCQUNEO29CQUNFLFFBQVEsRUFBRSxFQUFFO29CQUNaLElBQUksRUFBRSxjQUFjO29CQUNwQixVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7b0JBQzNDLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2dCQUNEO29CQUNFLFFBQVEsRUFBRSxFQUFFO29CQUNaLElBQUksRUFBRSxVQUFVO29CQUNoQixVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRO2lCQUNwQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUMxRCxNQUFNLEVBQUUsR0FBRyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFDLENBQUM7WUFDM0YsWUFBWSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3ZGLEdBQUc7WUFDSCxrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLG1CQUFtQixFQUFFLEdBQUc7U0FDekIsQ0FBQyxDQUFDO0lBRUwsQ0FBQztDQUNGO0FBMUNELDRCQTBDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYi9jb3JlXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIHJkcyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtcmRzJztcbmltcG9ydCB7IEVjMkFjdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoLWFjdGlvbnMnO1xuaW1wb3J0ICogYXMgZWMyIGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0IHsgU3VibmV0VHlwZSwgVnBjLCBJU3VibmV0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5cbi8vIGltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcbiAgXG5cblxuZXhwb3J0IGNsYXNzIFJkc1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cblxuICAgIGNvbnN0IHZwYyA9IG5ldyBlYzIuVnBjKHRoaXMsICdUaGVWUEMnLCB7XG4gICAgICBuYXRHYXRld2F5czogMSxcbiAgICAgIHN1Ym5ldENvbmZpZ3VyYXRpb246IFtcbiAgICAgICAge1xuICAgICAgICAgIGNpZHJNYXNrOiAyNixcbiAgICAgICAgICBuYW1lOiAnUHVibGljJyxcbiAgICAgICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5QVUJMSUMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjaWRyTWFzazogMjYsXG4gICAgICAgICAgbmFtZTogJ0FwcGxpY2F0aW9uMScsXG4gICAgICAgICAgc3VibmV0VHlwZTogZWMyLlN1Ym5ldFR5cGUuUFJJVkFURV9XSVRIX05BVCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNpZHJNYXNrOiAyNixcbiAgICAgICAgICBuYW1lOiAnQXBwbGljYXRpb24yJyxcbiAgICAgICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5QUklWQVRFX1dJVEhfTkFULFxuICAgICAgICAgIHJlc2VydmVkOiB0cnVlLCAgIC8vIDwtLS0tIFRoaXMgc3VibmV0IGdyb3VwIGlzIHJlc2VydmVkXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjaWRyTWFzazogMjcsXG4gICAgICAgICAgbmFtZTogJ0RhdGFiYXNlJyxcbiAgICAgICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5JU09MQVRFRCxcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyByZHMuRGF0YWJhc2VJbnN0YW5jZSh0aGlzLCAnSW5zdGFuY2UnLCB7XG4gICAgICBlbmdpbmU6IHJkcy5EYXRhYmFzZUluc3RhbmNlRW5naW5lLnBvc3RncmVzKHt2ZXJzaW9uOiByZHMuUG9zdGdyZXNFbmdpbmVWZXJzaW9uLlZFUl8xMl8xMH0pLFxuICAgICAgaW5zdGFuY2VUeXBlOiBlYzIuSW5zdGFuY2VUeXBlLm9mKGVjMi5JbnN0YW5jZUNsYXNzLkJVUlNUQUJMRTIsIGVjMi5JbnN0YW5jZVNpemUuU01BTEwpLFxuICAgICAgdnBjLFxuICAgICAgcHVibGljbHlBY2Nlc3NpYmxlOiB0cnVlLFxuICAgICAgbWF4QWxsb2NhdGVkU3RvcmFnZTogMjAwLFxuICAgIH0pO1xuXG4gIH1cbn1cbiJdfQ==