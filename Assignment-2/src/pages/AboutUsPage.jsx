import Labels from "../Shared/Labels";

function AboutUsPage() {

    return (
       <>
           <div className="container-fluid mt-5">
               <div className="row mt-5">
                    <div className="col-md-12 mt-5">
                        <h1>{Labels.AboutUs}</h1>
                        <p>{Labels.LoremIpsum}</p>
                   </div>
               </div>
           </div>

        </>
        
    );
}
export default AboutUsPage;