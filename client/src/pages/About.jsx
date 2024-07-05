import React from "react";
// import AboutImg from "../assets/images/about-img";
const About = () => {
  return (
    <>
    <br/>
    <br/>
      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span> us
        </h1>

        <div className="row">
          {/* <div className="image">
            <img src={AboutImg} alt="" />
          </div> */}

          <div className="content">
          <h3>Exploring Culinary Delights: A Journey Through Food</h3>
            <p>
              Food is more than just sustenance; it's an experience that engages
              all the senses. Join us on a culinary adventure as we explore the
              diverse flavors, textures, and cultures behind some of the world's
              most beloved dishes.
            </p>
            <p>
              From tantalizing street food in bustling markets to elegant
              fine dining experiences, we'll take you on a journey that
              celebrates the rich tapestry of culinary traditions from around
              the globe.
            </p>
            <p>
              Whether you're a seasoned food enthusiast or just beginning
              your gastronomic exploration, our blog promises to inspire,
              educate, and delight your taste buds. Stay tuned for mouthwatering
              recipes, insider tips, and captivating stories that celebrate
              the magic of food.
            </p>
            <a href="#" className="btn">
              Read More
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
