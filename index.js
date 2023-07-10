const core = require('@actions/core');
const github = require('@actions/github');

const allEnvs = core.getInput('envs');

const envs = allEnvs.split(',');

const file = core.getInput('file');

const replaceTokens = (content, env) => {
    const regex = new RegExp(`\\$${env}`, 'g');
    return content.replace(regex, env);
}

const run = async () => {
    try {
        const token = core.getInput('repo-token');
        const octokit = new github.GitHub(token);

        const { owner, repo } = github.context.repo;

        const content = await octokit.repos.getContents({
            owner,
            repo,
            path: file,
        });

        const buff = Buffer.from(content.data.content, 'base64');
        const fileContent = buff.toString('utf-8');

        const newContent = envs.reduce((acc, env) => replaceTokens(acc, env), fileContent);

        await octokit.repos.createOrUpdateFile({
            owner,
            repo,
            path: file,
            message: `Update ${file}`,
            content: Buffer.from(newContent).toString('base64'),
            sha: content.data.sha,
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}