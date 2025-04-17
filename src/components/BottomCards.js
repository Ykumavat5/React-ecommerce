import React, { useState } from "react";

const BottomCards = () => {
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <section className="py-5">
            <div className="container-lg">
                <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-5">
                    {[
                        { icon: "#package", title: "Free delivery", text: "Lorem ipsum dolor sit amet, consectetur adipi elit." },
                        { icon: "#secure", title: "100% secure payment", text: "Lorem ipsum dolor sit amet, consectetur adipi elit." },
                        { icon: "#quality", title: "Quality guarantee", text: "Lorem ipsum dolor sit amet, consectetur adipi elit." },
                        { icon: "#savings", title: "Guaranteed savings", text: "Lorem ipsum dolor sit amet, consectetur adipi elit." },
                        { icon: "#offers", title: "Daily offers", text: "Lorem ipsum dolor sit amet, consectetur adipi elit." }
                    ].map((item, index) => (
                        <div key={index} className="col d-flex">
                            <div 
                                className="card mb-3 border border-dark-subtle p-3 w-100" 
                                style={{
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer',
                                    transform: hoverIndex === index ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow: hoverIndex === index ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none'
                                }}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                <div className="text-dark mb-3">
                                    <svg width="32" height="32">
                                        <use href={item.icon}></use>
                                    </svg>
                                </div>
                                <div className="card-body p-0">
                                    <h5>{item.title}</h5>
                                    <p className="card-text">{item.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BottomCards;
