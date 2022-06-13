import axios from "axios";
import { Octokit } from "octokit";

const GITHUB_TOKEN = process.env.REACT_APP_PERSONAL_ACCESS_TOKEN;

export async function getCollaborators(string) {
  const arr = string.split("/");
  const owner = arr[0];
  const repo = arr[1];
  const octokit = new Octokit({
    // auth: GITHUB_TOKEN,
  });
  const res = await octokit
    .request("GET /repos/{owner}/{repo}/contributors", {
      owner: owner,
      repo: repo,
    })
    .then((res) => res.data);
  return res;
}

//Graph QL
export async function getRepositories(string) {
  const bearerToken = `Bearer ${GITHUB_TOKEN}`;
  axios.defaults.headers.common["Authorization"] = bearerToken;
  const data = await axios({
    url: "https://api.github.com/graphql",
    method: "post",
    data: {
      query: `
      {
        search(query: "${string}", type: REPOSITORY, first: 20) {
          edges {
            node {
              ... on Repository {
                name
                url
                owner {
                  login
                }
              }
            }
          }
        }
      }
      `,
    },
  }).then((res) => res.data.data.search.edges);

  return data;
}
