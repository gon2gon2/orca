import type { GitHubOwnerRepo } from '../../shared/github/pull-request-types'

export type GitHubApiRepositoryResolution =
  | GitHubOwnerRepo
  | null
  | undefined
  | (() => Promise<GitHubOwnerRepo | null>)

// Why: renderer/RPC overrides reach authenticated REST paths. `_` is allowed after
// the first character because Enterprise Managed User logins end in `_<shortcode>`.
const OWNER_SLUG_RE = /^[A-Za-z0-9][A-Za-z0-9_-]*$/
const REPOSITORY_SLUG_RE = /^[A-Za-z0-9._-]+$/

export function isValidGitHubApiRepository(repository: GitHubOwnerRepo): boolean {
  return (
    OWNER_SLUG_RE.test(repository.owner) &&
    REPOSITORY_SLUG_RE.test(repository.repo) &&
    repository.repo !== '.' &&
    repository.repo !== '..'
  )
}
