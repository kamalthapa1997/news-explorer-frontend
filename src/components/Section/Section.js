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
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
            <br />
            <br />
            You can also talk about your experience with Practicum, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Section;
