/* =====================================================
   VED ARCHFLOW
   HISTORY SYSTEM
===================================================== */


const historyContainer = document.getElementById(
    "historyContainer"
);



/* =========================
   LOAD HISTORY
========================= */


function loadHistory(){


    const projects =
    JSON.parse(
        localStorage.getItem("vedArchFlowHistory")
    ) || [];



    if(projects.length === 0){


        historyContainer.innerHTML = `

        <div class="history-empty">

            <h2>
            No Projects Yet
            </h2>

            <p>
            Your generated 3D models will appear here.
            </p>

        </div>

        `;


        return;

    }






    historyContainer.innerHTML = "";




    projects.reverse().forEach((project,index)=>{


        const card =
        document.createElement("div");


        card.className =
        "history-card";



        card.innerHTML = `


            <h2>
            Project #${projects.length - index}
            </h2>


            <p>
            3D Architectural Model Generated
            </p>


            <small>
            ${project.date}
            </small>



            <a 
            href="${project.url}"
            download="VED_ArchFlow_Model.glb"
            class="history-download">

            Download Model

            </a>


        `;



        historyContainer.appendChild(card);



    });


}





loadHistory();