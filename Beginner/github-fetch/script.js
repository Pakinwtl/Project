async function fetchGithubprofile() {
  const username = document.getElementById("username").value.trim();
  const profileDiv = document.getElementById("profile");

  console.log(username);

  if (username === "") {
    alert("Please enter a GitHub username.");
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    console.log(response);
    const data = await response.json();
    profileDiv.innerHTML = `
            <img src="${data.avatar_url}" alt="${data.name}">
            <h2>${data.name}</h2>
            <p>${data.bio || "No bio available"}</p>
            <p>Followers: ${data.followers}</p>
            <a href="${data.html_url}" target="_blank">View Profile</a>
            `;
  } catch (error) {
    profileDiv.innerHTML = `<p>${error.message}</p>`;
    return;
  }
}
