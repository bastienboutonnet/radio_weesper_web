---
title: "{{ replace .Name "-" " " | title }}"
show_name: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
showtime: ""
showendtime: ""
description: ""
image: "/images/placeholder.png"
tags: []
artists: ["{{ replace .Name "-" " " | title }}"]
is_resident: true
---

Write a short description or episode notes here.
