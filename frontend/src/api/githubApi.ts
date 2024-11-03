// githubApi.ts
interface LanguageUsage {
  [language: string]: number;
}

export const fetchGitHubData = async (username: string, token: string) => {
  try {
    // Fetch user data
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: { Authorization: `token ${token}` },
      }
    );
    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: { Authorization: `token ${token}` },
      }
    );
    const repos = await reposResponse.json();

    const totalStars = Array.isArray(repos)
      ? repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
      : 0;

    const languageData: LanguageUsage = {};

    for (const repo of repos) {
      const languagesResponse = await fetch(repo.languages_url, {
        headers: { Authorization: `token ${token}` },
      });
      const repoLanguages = await languagesResponse.json();

      for (const [language, bytes] of Object.entries(repoLanguages)) {
        languageData[language] =
          (languageData[language] || 0) + (bytes as number);
      }
    }

    return {
      githubStats: {
        totalStars,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
      },
      languages: languageData,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    throw error;
  }
};
