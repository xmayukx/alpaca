<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/xmayukx/alpaca">
    <img src="https://github.com/xmayukx/alpaca/assets/89103181/c11e0a5a-aff0-4504-870d-6920e23d818e" alt="Logo" width="150" height="80">
  </a>

  <h3 align="center">Alpaca</h3>

  <p align="center">
    <br />
    <a href="https://alpaca-sigma.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/xmayukx/alpaca/issues">Report Bug</a>
    ·
    <a href="https://github.com/xmayukx/alpaca/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Welcome to Alpaca, a cutting-edge web application designed to transform your PDF reading experience. Inspired by the powerful capabilities of chatGPT, Alpaca employs advanced artificial intelligence to analyze the content of your PDF documents and provide detailed answers to your questions.

 ### Key Features:
**Intelligent Document Analysis:** Alpaca goes beyond traditional PDF readers by leveraging AI to understand the content within your documents. It comprehensively processes text, identifies key information, and extracts valuable insights.

**Question-Driven Responses:** Interact with your documents like never before. Ask questions related to the content, and Alpaca will generate accurate and contextually relevant answers. Whether you're seeking specific details or a broader understanding, Alpaca has you covered.

**User-Friendly Interface:** We believe in simplicity and accessibility. Alpaca features an intuitive interface that allows you to effortlessly upload your PDFs, ask questions, and navigate through the generated responses. Enjoy a seamless and efficient user experience.

**Secure Document Handling:** Your privacy and data security are our top priorities. Alpaca ensures the confidentiality of your documents during the analysis process. We do not store any sensitive information, providing you with peace of mind.

### How It Works:
**Upload Your PDF:** Begin by uploading your PDF document through the user-friendly interface. Alpaca supports a wide range of PDF files, from research papers to reports and beyond.

**Ask Questions:** Once your document is uploaded, engage with it by asking questions. Alpaca's AI engine will process your queries, analyze the content, and generate accurate responses in real-time.

**Explore Insights:** Dive into the detailed answers provided by Alpaca. Uncover hidden gems within your documents, gain a deeper understanding of the content, and save time by extracting key information effortlessly.

### Why Alpaca?
**Efficiency:** Alpaca streamlines your reading process, allowing you to quickly extract relevant information from lengthy documents.
**Precision:** The AI-powered analysis ensures that the responses are contextually accurate, providing you with reliable insights.
**Innovation:** Embrace the future of document interaction. Alpaca represents a leap forward in the integration of AI and document reading.
Revolutionize your PDF reading experience with Alpaca. Say goodbye to traditional reading methods and embrace a new era of efficiency and intelligence. Get started today!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
* ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/your_username/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API in `.env.local`
 ```js
 NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
 CLERK_SECRET_KEY=
 NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
 NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
 NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
 NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

 #NEONdb
 DATABASE_URL=

 #AWS-S3
 NEXT_PUBLIC_S3_ACCESS_KEY_ID=
 NEXT_PUBLIC_S3_SECRET_KEY=
 NEXT_PUBLIC_S3_BUCKET_NAME=

 #Pinecone ENV
 PINECONE_ENVIRONMENT=
 PINECONE_API_KEY=

 #OPENAI
 OPENAI_API_KEY=

 #STRIPE
 STRIPE_API_KEY=

 NEXT_PUBLIC_BASE_URL=http://localhost:3000
 STRIPE_WEBHOOK_SECRET=
 ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@xmayuk_hx](https://twitter.com/xmayuk_hx) - hazari.mayukh77@gmail.com
Project Link: [https://github.com/xmayukx/alpaca](https://github.com/xmayukx/alpaca)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

