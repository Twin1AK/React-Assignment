import '../Shared/Styles/Footer.scss';
function Footer() {
    let iconBgColors = ['#3b5998', '#55acee', '#dd4b39', '#ac2bac', '#0082ca', '#333333', 'rgba(0, 0, 0, 0.2)'];
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-md-12">
                        <footer className="bg-dark text-center text-white footer">
                            <div className="container p-4 pb-0">
                                <section className="mb-4">
                                    <a
                                        className="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[0] }}
                                        href="#!"
                                        role="button"
                                        ><i className="bi bi-facebook"></i
                                    ></a>

                                    <a
                                        className="btn text-white btn-floating m-1"
                                        style={{backgroundColor: iconBgColors[1]}}
                                        href="#!"
                                        role="button"
                                        ><i className="bi bi-twitter"></i
                                    ></a>

                                    <a
                                        className="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[2] }}
                                        href="#!"
                                        role="button"
                                        ><i className="bi bi-google"></i
                                    ></a>

                                    <a
                                        className="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[3] }}
                                        href="#!"
                                        role="button"
                                        ><i className="bi bi-instagram"></i
                                    ></a>

                                    <a
                                        className="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[4] }}
                                        href="#!"
                                        role="button"
                                        ><i className="bi bi-linkedin"></i
                                    ></a>
                                    <a
                                        className="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[5] }}
                                        href="#!"
                                        role="button"
                                        ><i className="bi bi-github"></i
                                    ></a>
                                </section>
                            </div>
                            <div className="text-center p-3" style={{ backgroundColor: iconBgColors[6] }} >
                                © 2020 Copyright: Crypto-Exchange
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            
            
        </>
    );
}

export default Footer;