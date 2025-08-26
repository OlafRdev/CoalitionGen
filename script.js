const forms = document.getElementById("forms");
const addParty = document.getElementById("add");
const sendButton = document.getElementById("sendbutton");
const result = document.getElementById("ctable");
const form = document.querySelector("form");
const clearButton = document.getElementById("clearbutton");
let formCount = 1;

const createPartyForm = (i) => {
    forms.insertAdjacentHTML("beforeend",
    `
    <div id="party-${i}">
    <br>
    Color : <input type="color" id="color-${i}" name="color-${i}"><br><br>
    Party Name : <input type="text" id="name-${i}" name="name-${i}"><br><br>
    Domestic Party Name(optional) : <input type="text" id="domn-${i}" name="domn-${i}"><br><br>
    Abbreviation : <input type="text" id="abbr-${i}" name="abbr-${i}"><br><br>
    Leader : <input type="text" id="leader-${i}" name="leader-${i}"><br><br>
    Ideology : <br><br>
    <textarea rows="5" cols="30" id="ideology-${i}" name="ideology-${i}"></textarea>
    <br><br>
    Political position : 
    <select id="polpos-${i}" name="polpos-${i}">
        <option></option>
        <option>Big Tent</option>
        <option>Syncretic</option>
        <option>Far-left</option>
        <option>Left-wing</option>
        <option>Centre-left</option>
        <option>Centre</option>
        <option>Centre-right</option>
        <option>Right-wing</option>
        <option>Far-right</option>
    </select>
    <br><br>
    MPs seats <input type="number" size="5" id="seats-${i}" name="seats-${i}" pattern="\\d*" min="0"><br>
    Other parliament house seats(optional) <input type="number" size="5" id="apseats-${i}" name="apseats-${i}" pattern="\\d*" min="0"> <br><br>
    <button type="button" class="ctrlbtn remove" id="remove-${i}">X Remove</button>
    </div>
    `);
}

addParty.addEventListener("click", () => {
    formCount++;
    createPartyForm(formCount);
});


forms.addEventListener("click", (e) => { 
    if(e.target && e.target.classList.contains("remove")){
        e.target.closest("div[id^='party-']").remove();
    }
});

const renderTable = () => {

    let partyData = [];
    let partyForms = document.querySelectorAll("div[id^='party-']");

    partyForms.forEach((form) => {
        let id = form.id.split("-")[1];
        partyData.push({
        color: document.getElementById(`color-${id}`).value,
        name: document.getElementById(`name-${id}`).value,
        domn: document.getElementById(`domn-${id}`).value,
        abbr: document.getElementById(`abbr-${id}`).value,
        leader: document.getElementById(`leader-${id}`).value,
        ideology: document.getElementById(`ideology-${id}`).value.trim(),
        polpos: document.getElementById(`polpos-${id}`).value,
        seats: document.getElementById(`seats-${id}`).value,
        apseats: document.getElementById(`apseats-${id}`)?.value || ""
    });
});
    
   let parliamentName = document.getElementById("parliament-1").value;
   let parliamentCount = document.getElementById("total-1").value;

   let aptotal = document.getElementById(`aptotal-1`)?.value || "";
   let aparliament = document.getElementById(`aparliament-1`)?.value || "";

   let hasSecondParliament = aparliament && aptotal;



    let table = `
        <table>
            <tr><th colspan="2">Party</th><th>Abbr.</th><th>Leader</th><th>Ideology</th><th>Political position</th><th>MPs in <span class="ttext">${parliamentName}</span></th>${hasSecondParliament ? `<th>MPs in <span class="ttext">${aparliament}</span></th>` : ""}</tr>
    `;

    partyData.forEach(p => {
        let seats = parseInt(p.seats) || 0;
        let totalInput = document.getElementById("total-1");
        let total = totalInput ? parseInt(totalInput.value) || 0 : 0;
        let percent = total > 0 ? Math.round((seats / total) * 100) : 0;
        table += 
   `
   <tr>
        <td style="background-color:${p.color};"></td>
        <td class="ttext">${p.name}<br>
        <small class="dtext">${p.domn}</small>
        </td>
        <td>${p.abbr}</td>
        <td class="ttext">${p.leader}</td>
        <td class="ttext">${p.ideology.replace(/\n/g, "<br>")}</td>
        <td class="ttext">${p.polpos}</td>
        <td>
          <span>${p.seats}/${parliamentCount}</span>
          <div class="bar">
            <div class="barfill" style="width:${percent}%; background-color:${p.color};"></div>
          </div>
        </td>
        ${hasSecondParliament ? `
        <td>
          ${p.apseats ? `
            <span>${p.apseats}/${aptotal}</span>
            <div class="bar">
              <div class="barfill" style="width:${Math.round((p.apseats/aptotal)*100)}%; background-color:${p.color};"></div>
            </div>
          ` : ""}
        </td>` : ""}
      </tr>
   `;
    });
        table += `</table><br><hr>`;
        result.innerHTML = table;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    renderTable();
});


clearButton.addEventListener("click", () => {
    for(let i=formCount; i>1; i--){
        const elem = document.getElementById(`party-${i}`);
        if(elem) elem.remove();
    }
    formCount = 1;
    form.reset();
    result.innerHTML = "";

});
