# start-up local and deploy into GCP

`./mvnw -DskipTests spring-boot:run`
 
`./mvnw -DskipTests package appengine:deploy`

# checking logs
`gcloud app logs tail -s default


# changing projects 
`gcloud config set project $MY_PROJECT_ID`

