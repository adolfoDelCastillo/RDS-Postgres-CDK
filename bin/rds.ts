#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import { Construct } from '@aws-cdk/core';
import { CreatePostgresInstanceStack } from '../lib/create-postgres';
import { PublicSubnet } from 'aws-cdk-lib/aws-ec2';


const envName = 'Dev';
const stackPrefix = `${envName.slice(0, 1).toUpperCase()}${envName.slice(1)}`;
const defaultEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};


const app = new cdk.App();
//new DemoApp(app, 'dev');



const postgresDB = new CreatePostgresInstanceStack(
    app,
    `${stackPrefix}Postgres`,
    {
        env: defaultEnv,
        envName,
        instanceClass: ec2.InstanceClass.BURSTABLE2,
        instanceSize: ec2.InstanceSize.SMALL,
    }
);