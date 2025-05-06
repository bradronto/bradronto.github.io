#!/bin/bash
# This is a comment. Bash will ignore it.

echo "Deploying target" # Outputs "Hello, world!" to the terminal

# Example of a simple command
date # Displays the current date and time

# Example of a variable
name="Brad"
echo "Your name is $name"

# Example of conditional logic
if [ "$name" == "Brad" ]; then
  echo "Hello, Brad!"
else
  echo "I don't know you!"
fi

# Example of a loop
for i in {1..5}; do
  echo "Loop iteration $i"
done


git add .
git commit -m "change index title"
git push -u origin main
# git push origin main --force   # force push
#npm run deploy

