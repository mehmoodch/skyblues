pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')  // Store this in Jenkins Credentials
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')  // Store this in Jenkins Credentials
        S3_BUCKET_NAME = 'skybluedeveloper.com'
        AWS_REGION = 'eu-north-1' // Specify your AWS region
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout the latest code from GitHub
                git branch: 'main', url: 'https://github.com/mehmoodch/skyblues.git'
            }
        }

        stage('Install AWS CLI') {
            steps {
                // Install AWS CLI on Windows
                bat '''
                @echo off
                if not exist "%ProgramFiles%\\Amazon\\AWSCLIV2\\aws.exe" (
                    curl -o "%TEMP%\\\\AWSCLIV2.msi" https://awscli.amazonaws.com/AWSCLIV2.msi
                    msiexec /i "%TEMP%\\\\AWSCLIV2.msi" /qn
                )
                '''
            }
        }

        stage('Deploy to S3') {
            steps {
                // Deploy the code to S3
                bat '''
                aws s3 sync . s3://%S3_BUCKET_NAME% --delete
                '''
            }
        }
    }

    post {
        success {
            echo 'Code deployed successfully to S3!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
