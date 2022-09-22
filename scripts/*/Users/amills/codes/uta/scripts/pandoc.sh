#!/usr/bin/env bash

my_uuid="$(uuidgen | tail -c 12)"

input_file="$1"

if [[ -z "$input_file" ]]; then
  echo "What file would you like to source?"
  read input_file
fi

if [[ -z "$input_file" ]]; then
   echo "missing input_file";
   exit 1;
fi

# --latex-engine=xelatex
# --toc

file_name="$(basename "$input_file")";
file_dir="$(basename "$(dirname "$input_file")")";

temp_dir="$HOME/publications/temp"

mkdir -p "$temp_dir"

pandoc --pdf-engine=xelatex --wrap=preserve --from=markdown --output="$temp_dir/temp-$file_dir-$file_name-$my_uuid.pdf"  \
       --variable=geometry:"margin=0.5cm, paperheight=421pt, paperwidth=595pt" \
       --highlight-style=espresso \
       "$input_file"