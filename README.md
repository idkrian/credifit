
<br />
<div align="center">

  <h1 align="center">Credifit Test</h1>

  <p align="center">
    Credifit full stack teste
</div>

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* yarn
  ```sh
  npm install --global yarn
  ```
* Install the latest version of NodeJS

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/idkrian/credifit.git
   ```
   
Backend:
1. Install PostgreSQL
2. Install packages
   ```sh
   yarn
   ```
3. Change prisma.scheme with your database settings
   ```sh
   provider = "postgresql"
   url      = env("postgresql://USER:PASSWORD@HOST:PORT/DATABASE")
   ```
4. Install Prisma CLI
   ```sh
    yarn add prisma --dev
   ```
5. Run Prisma migrations
   ```sh
   npx prisma migrate dev
   ```
6. Run the project
   ```sh
   yarn dev
   ```
Frontend:
1. Install packages
   ```sh
   yarn
   ```
2. Run the project
   ```sh
   yarn dev
   ```
<!-- USAGE EXAMPLES -->

<!-- LICENSE -->
## License

Distributed under the MIT License.


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Javascript]: https://img.shields.io/badge/Javascript-grey?style=for-the-badge&logo=javascript
[Javascript-url]: https://javascript.com
