export function anonymousName(username) {
  if (username.length === 2) {
    return `${username[0]}*`
  }

  if (username.length === 3) {
    return `${username[0]}*${username[2]}`;
  }

  if (username.length === 4) {
    return `${username[0]}**${username[3]}`;
  }

  if (username.length === 5) {
    return `${username[0]}***${username[3]}`;
  }
} 