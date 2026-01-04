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
            echo "Publishing Playwright HTML report"

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }

        failure {
            echo "Build failed — sending Teams notification"

            sh """
            curl -H 'Content-Type: application/json' -d '{
              "@type": "MessageCard",
              "@context": "http://schema.org/extensions",
              "summary": "Playwright Sanity Failed",
              "themeColor": "FF0000",
              "title": "❌ Playwright Sanity Test Failed",
              "text": "Check Jenkins report: ${BUILD_URL}"
            }' ${TEAMS_WEBHOOK}
            """
        }

        success {
            echo "Build successful — sending Teams notification"

            sh """
            curl -H 'Content-Type: application/json' -d '{
              "@type": "MessageCard",
              "@context": "http://schema.org/extensions",
              "summary": "Playwright Sanity Passed",
              "themeColor": "00FF00",
              "title": "✅ Playwright Sanity Test Passed",
              "text": "Report: ${BUILD_URL}"
            }' ${TEAMS_WEBHOOK}
            """
        }
    }
}
