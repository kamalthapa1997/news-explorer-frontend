import React from "react";
import "./Section.css";
import authorImg from "../../images/author.jpg";

function Section() {
  return (
    <section className="section">
      <div className="section__about-me">
        {/* <div className="section__image-author"></div> */}
        <img className="section__image-author" src={authorImg} alt="author" />

        <div className="section__infos">
          <h3 className="section__title">About the author</h3>
          <p className="section__textcontent">
            Hey there! 👋 I started off in high school, diving into the world of
            science. Fast forward to today, and I'm a self-taught tech
            enthusiast. While my official CS journey took a detour, I found my
            way through a 10-month software engineering bootcamp, rocking the
            MERN stack. I love coding and problem-solving, and I'm always up for
            a challenge. Join me on this digital adventure - I'm all about tech,
            coffee, and making cool things happen! ☕💻
          </p>
        </div>
      </div>
    </section>
  );
}

export default Section;
