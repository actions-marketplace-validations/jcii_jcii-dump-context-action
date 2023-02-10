import * as core from '@actions/core'
import {context, GitHub} from '@actions/github'
import {wait} from './wait'

console.log(process.env)
async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.info(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.info(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.info(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
    const octokit = new GitHub(core.getInput('github_token'))
    const response = await octokit.repos.listBranches({
      ...context.repo
    })
    console.log(response.data)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
