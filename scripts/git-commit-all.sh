#!/usr/bin/env bash



git status

echo 'Hit enter if you wish to proceed with the commit.';

read hit_ok

git add -A

echo 'type your commit message:'
read git_commit_message;

if [[ -z "$git_commit_message" ]]; then
  git_commit_message="$(date)"
fi

echo "This is what your git commit message looks like:"
echo "'$git_commit_message'"

echo 'Does that commit message look good?'
read hit_ok

git commit -am "${git_commit_message}"

git push || {
  echo 'could not push to remote'
}