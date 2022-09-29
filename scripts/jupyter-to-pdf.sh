#!/usr/bin/env bash

pdf_engine_2='texlive-xetex'
pdf_engine='xelatex'

my_uuid="$(uuidgen | tail -c 12)"
my_uuid_2="$(uuidgen | tail -c 12)"

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

tex_file="$temp_dir/${my_uuid_2}.tex"

ipython nbconvert --latex-engine=texlive-xetex --to pdf "$input_file"

## OR DO THIS
jupyter nbconvert --to pdf '/Users/amills/codes/lp-fall-2022/lp_programming_2.ipynb'


pandoc --pdf-engine="$pdf_engine" --wrap=preserve \
       --output="$temp_dir/temp-$file_dir-$file_name-$my_uuid.pdf"  \
       --variable=geometry:"margin=0.5cm, paperheight=421pt, paperwidth=595pt" \
       --highlight-style=espresso \
       "$tex_file"