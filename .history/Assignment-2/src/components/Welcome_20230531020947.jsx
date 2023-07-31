import Labels from '../Shared/Labels';
import '../Shared/Styles/Home.scss'
function Welcome() {
    return (
        <>
            <div className="container-fluid pt-5 m-0 mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-wrapper">
                            <div className="row">
                                <div className="text-dark header col-md-12">
                                    <h1>{Labels.WelcomeToCryptoWorld}</h1>
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="description col-md-12">
                                    <div className="text-dark text-left">
                                        {Labels.LoremIpsum}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="img-wrapper">
                            <div className="img">
                                <img src="/imgs/applogo.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Welcome;