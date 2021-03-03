/*
 * Copyright (C) 2020 Knot.x Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const showdown = require('showdown');

export const loadMarkdown = (path) => {
  const converter = new showdown.Converter();
  converter.setFlavor('github');
  converter.setOption('openLinksInNewWindow', 'true');

  const user = 'Knotx';
  const repo = 'knotx-fragments';
  const url = `https://api.github.com/repos/${user}/${repo}/contents/${path}/README.md`;
  const requestOptions = { headers: { accept: 'application/vnd.github.v3.raw' } };
  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) return '# There was error with your response, please check the details and try again';
      return response.text();
    })
    .then((response) => {
      const docContainer = document.getElementById('doc-page-container');
      docContainer.innerHTML = converter.makeHtml(response);

      docContainer.querySelectorAll('img').forEach((el) => {
        const imgSrc = el.getAttribute('src');
        if (imgSrc) {
          el.setAttribute('src', `https://raw.githubusercontent.com/Knotx/knotx-fragments/master/${path}/${imgSrc}`);
        }
      });
    });
};
