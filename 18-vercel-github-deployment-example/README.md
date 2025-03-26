# Deployments using vercel

# Our deployment

[github repo](https://github.com/dgmouris/dmit2008-a01-winter-2025-deployment-example)

[our deployment](https://dmit2008-a01-winter-2025-deployment-example.vercel.app/)

# Deployment workflow

[Deployments](deployments.excalidraw)

# Iaas Vs Paas

[look here](paas_saas_iaas.excalidraw)


# Why?

You need to deploy your applications ("to production") to make them reachable for everyone and have a usable product/site. We're going to use Vercel for our deployment. They created and currently maintain Next.js and they have a pretty good pricing model.

There are other options that you can choose like netlify, digital ocean or any of the large cloud companies like Google, AWS and Azure.

# Steps

1. Copy one of the projects that we've worked on in this course into this folder and push it up to github. (as long as it's not already in an existing github repository as we're going to create it h here.)
- Go to github and create a new repo [here](https://github.com/new).
- Go to the folder with the "package.json" in it
- initialize it using `git init`
- add all of the contents `git add .` You can check it with `git status` to make sure everything is correctly in the "staging" area.
- commit all of it `git commit -m "Initial commit"`
- change the "master" branch to the "main" branch `git branch -M main`
- add the repository remote to your repo so that you can push to the repository `git remote add origin https://github.com/dgmouris/dmit2008-test-deploy-repo.git` this adds the remote as "origin"
2. Go to the Vercel [Dashboard page](https://vercel.com/dashboard) and add your project created in the previous step.
- Click "add new" on the project page. ( should bring you [here](https://vercel.com/new))
- click "Continue to Github" sign in with you permissions if you need it.
- click on "Adjust Github App Permissions" as your repository most likely won't be there. This will pop up a page in Github for the Vercel Application.
- in the "Repository Access" section, select "Only Select Repositories".
	- in the select repositories use the repo you specified as the remote (look above in step one) for me it was "dmit2008-test-deploy-repo" (it'll be different for you)
3. Configure your project on Vercel.
- Give your project a name!
- Give the framework preset of "Next.js" as that's what we've been using!
	- Note: You can keep the framework preset the same as have it from the root.
- Notice the Environment variables.
	- This is where we save our "secret keys" (where locally this would be rendered with an ".env.local" file.)
- Click Deploy and Voila.
4.  Open the Project!
- Go to vercel and open the project.
