pipeline {
    agent any

    environment {
        NODE_ENV = 'ci'
        PLAYWRIGHT_HTML_REPORT = 'playwright-report'
        TEAMS_WEBHOOK = credentials('teams-webhook') // Jenkins credential
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    parameters {
        choice(
            name: 'TEST_TAG',
            choices: ['@smoke', '@regression'],
            description: 'Select test tag to execute'
        )
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/your-username/your-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                  npm ci
                  npx playwright install --with-deps
                '''
            }
        }

        stage('Run Playwright Tests (Parallel)') {
            parallel {

                stage('Chromium') {
                    steps {
                        sh '''
                          npx playwright test --grep "${TEST_TAG}" --project=chromium
                        '''
                    }
                }

                stage('Firefox') {
                    steps {
                        sh '''
                          npx playwright test --grep "${TEST_TAG}" --project=firefox
                        '''
                    }
                }
            }
        }
    }

   post {
    always {
        echo 'Publishing Playwright HTML report'

        publishHTML([
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright HTML Report'
        ])
    }

    failure {
        echo 'Build failed – check Playwright HTML report'
    }

    success {
        echo 'Build succeeded – Playwright tests passed'
    }
}
}
