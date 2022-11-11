// ここからJavaScriptを記述してください。
const config = {
    parentId: "target",
    url: "https://api.recursionist.io/builder/computers?type=",
    currPart: {
    "cpu": "",
    "gpu": "",
    "ram": "",
    "storage": ""
    },
    "createPCCouter":0
}

class Part{
    constructor(type, brand, model, benchmark){
        this.type = type;
        this.brand = brand;
        this.model = model;
        this.benchmark = benchmark;
    }
}

class PC{
    constructor(cpu, gpu, ram, storage){
        this.cpu = cpu;
        this.gpu = gpu;
        this.ram = ram;
        this.storage = storage;
    }

    calcurateGamingScore(){
        if(this.storage.type === "ssd"){
            return　Math.floor(this.cpu.benchmark*0.25 + this.gpu.benchmark*0.6 + this.ram.benchmark*0.125 + this.storage.benchmark*0.1);
        }else{
            return Math.floor(this.cpu.benchmark*0.25 + this.gpu.benchmark*0.6 + this.ram.benchmark*0.125 + this.storage.benchmark*0.025);
        }
    }

    calucrateWorkingScore(){
        return Math.floor(this.cpu.benchmark*0.6 + this.gpu.benchmark*0.25 + this.ram.benchmark*0.1 + this.storage.benchmark*0.05);
    }

}

function createPage(){

    let container = document.createElement("div");
    container.classList.add("bg-white");
    container.innerHTML = `
    <div id="title" class="text-center text-white bg-secondary">
        <h2>Build Your Own PC</h2>
    </div>

    <div class="mt-3 col-12">
        <h4>Step1: Select your CPU</h4>
        <div class="d-flex flex-row">
            <div class="d-flex flex-row col-4 mt-3">
                <p class="mr-2">Brand: </p>
                <select id="cpu" class="form-select form-control form-control-sm">
                    <option selected>-</>
                </select>
            </div>
            <div class="d-flex flex-row col-4 mt-3">
                <p class="mr-2">Model: </p>
                <select id="cpuModel" class="form-select form-control form-control-sm">
                    <option selected>-</>
                </select>
            </div>
        </div>
    </div>

    <div class="mt-3 col-12">
        <h4>Step2: Select your GPU</h4>
        <div class="d-flex flex-row">
            <div class="d-flex flex-row col-4 mt-3">
                <p class="mr-2">Brand: </p>
                <select id="gpu" class="form-select form-control form-control-sm">
                    <option selected>-</>
                </select>
            </div>
            <div class="d-flex flex-row col-4 mt-3">
                <p class="mr-2">Model: </p>
                <select id="gpuModel" class="form-select form-control form-control-sm">
                    <option selected>-</>
                </select>
            </div>
        </div>
    </div>

    <div class="mt-3 col-12">
        <h4>Step3: Slect your memory card</h4>
        <div class="d-flex flex-row mt-3 col-12">
            <p class="mr-2">How Many?</p>
            <select id="ramNum" class="form-select form-control form-control-sm col-1 mr-4">
                <option selected>-</>
                <option value=1>1</>
                <option value=2>2</>
                <option value=3>3</>
                <option value=4>4</>
            </select>

            <p class="mr-2">Brand: </p>
            <select id="ramBrand" class="form-select form-control form-control-sm col-3 mr-4">
                <option selected>-</>
            </select>

            <p class="mr-2">Model: </p>
            <select id="ramModel" class="form-select form-control form-control-sm col-3 mr-4">
                <option selected>-</>
            </select>
        </div>
    </div>

    <div class="mt-3 col-12">
        <h4>Step4: Select your storage</h4>
        <div class="d-flex flex-row mt-3 col-12">
            <p class="mr-2">HDD or SSD</p>
            <select id="storageType" class="form-select form-control form-control-sm col-1 mr-4">
                <option selected>-</>
                <option value="hdd">HDD</>
                <option value="ssd">SSD</>
            </select>

            <p class="mr-2">Storage: </p>
            <select id="storageSize" class="form-select form-control form-control-sm col-1 mr-4">
                <option selected>-</>
            </select>

            <p class="mr-2">Brand: </p>
            <select id="storageBrand" class="form-select form-control form-control-sm col-2 mr-4">
                <option selected>-</>
            </select>
            <p class="mr-2">Model: </p>
            <select id="storageModel" class="form-select form-control form-control-sm col-2 mr-4">
                <option selected>-</>
            </select>
        </div>
    </div>

    <div class="d-flex justify-content-center my-3">
        <button type="btn" class="btn btn-primary btn-block col-10 addPc">Add PC!</button>
    </div>

    <div id="builderPC">
    </div>
    `;

    createSelectMenu("cpu");
    container.querySelectorAll("#cpu")[0].addEventListener("change", function(){
        getBrand("cpu");
    })

    container.querySelectorAll("#cpuModel")[0].addEventListener("change", function(){
        createPart("cpu");
    })

    createSelectMenu("gpu");
    container.querySelectorAll("#gpu")[0].addEventListener("change", function(){
        getBrand("gpu");
    })
    container.querySelectorAll("#gpuModel")[0].addEventListener("change", function(){
        createPart("gpu");
    })

    container.querySelectorAll("#ramNum")[0].addEventListener("change", function(){
        container.querySelectorAll("#ramBrand")[0].innerHTML = `<option selected>-</>`;
        container.querySelectorAll("#ramModel")[0].innerHTML = `<option selected>-</>`;
        let value = document.getElementById("ramNum").value;
        createSelectRamMenu("ram", value);
    })

    container.querySelectorAll("#ramBrand")[0].addEventListener("change", function(){
        container.querySelectorAll("#ramModel")[0].innerHTML = `<option selected>-</>`;
        let value = document.getElementById("ramBrand").value;
        createRamModelMenu("ram", value, document.getElementById("ramNum").value);
    })

    container.querySelectorAll("#ramModel")[0].addEventListener("change", function(){
        let selectRam = document.querySelectorAll(".ram")[document.getElementById("ramModel").selectedIndex-1];
        let createRam = new Part("ram", document.getElementById("ramBrand").value, selectRam.innerHTML, selectRam.getAttribute("benchmark"));
        config.currPart.ram = createRam;
    })

    container.querySelectorAll("#storageType")[0].addEventListener("change", function(){
        container.querySelectorAll("#storageSize")[0].innerHTML = `<option selected>-</>`;
        container.querySelectorAll("#storageBrand")[0].innerHTML = `<option selected>-</>`;
        container.querySelectorAll("#storageModel")[0].innerHTML = `<optin selected>-</>`;
        let storageType = document.getElementById("storageType").value;
        if(storageType === "hdd"){
            createSelectStorageMenu("hdd");
        }
        if(storageType === "ssd"){
            createSelectStorageMenu("ssd");
        }
    })

    container.querySelectorAll("#storageSize")[0].addEventListener("change", function(){
        container.querySelectorAll("#storageBrand")[0].innerHTML = `<option selected>-</>`;
        container.querySelectorAll("#storageModel")[0].innerHTML = `<optin selected>-</>`;
        let storageSize = document.getElementById("storageSize").value;
        createStorageBrandMenu(document.getElementById("storageType").value, storageSize);
    })

    container.querySelectorAll("#storageBrand")[0].addEventListener("change", function(){
        container.querySelectorAll("#storageModel")[0].innerHTML = `<option selected>-</>`;
        let value = document.getElementById("storageBrand").value;
        createStorageModelMenu(document.getElementById("storageType").value, document.getElementById("storageSize").value, value);
    })

    container.querySelectorAll("#storageModel")[0].addEventListener("change", function(){
        let selectStorage = document.querySelectorAll("."+document.getElementById("storageType").value)[document.getElementById("storageModel").selectedIndex-1];
        let createStorage = new Part(document.getElementById("storageType").value, document.getElementById("storageBrand").value, selectStorage.innerHTML, selectStorage.getAttribute("benchmark"));
        config.currPart.storage = createStorage;
    })

    container.querySelectorAll(".addPC")[0].addEventListener("click", function(){
        if(inputCheck()){
            config.createPCCouter += 1;
            let buildPC = new PC(config.currPart.cpu, config.currPart.gpu, config.currPart.ram, config.currPart.storage)
            addPC(buildPC);
        }
    })

    return container;
}

function addPC(pc){
    let container = document.createElement("div");
    container.classList.add("bg-primary");
    container.innerHTML = 
    `
    <div class="m-2">
        <div class="p-2">
            <h3 class="text-center">Your PC${config.createPCCouter}</h3>
        </div>
        <div class="d-flex flex-row justify-content-around my-3">
            <div class="col-3">
                <h4>${pc.cpu.type.toUpperCase()}</h4>
                <p>Brand: ${pc.cpu.brand}</p>
                <p>Model: ${pc.cpu.model}</p>
            </div>
            <div class="col-3">
                <h4>${pc.gpu.type.toUpperCase()}</h4>
                <p>Brand: ${pc.gpu.brand}</p>
                <p>Model: ${pc.gpu.model}</p>
            </div>
            <div class="col-3">
                <h4>${pc.ram.type.toUpperCase()}</h4>
                <p>Brand: ${pc.ram.brand}</p>
                <p>Model: ${pc.ram.model}</p>
            </div>
            <div class="col-3">
                <h4>Storage</h4>
                <p>Disk: ${pc.storage.type.toUpperCase()}</p>
                <p>Storage: ${document.getElementById("storageSize").value}</p>
                <p>Brand: ${pc.storage.brand}</p>
                <p>Model: ${pc.storage.model}</p>
            </div>
        </div>
        <div class="p-2">
            <h2>Score</h2>
            <div class="d-flex flex-row col-10 justify-content-senter">
                <h3 class="col-5">Gaming : ${pc.calcurateGamingScore()}%</h3>
                <h3 class="col-5 ml-3">Working : ${pc.calucrateWorkingScore()}%</h3>
            </div>
        </div>
    </div>
    `;
    document.getElementById(config.parentId).querySelectorAll("#builderPC")[0].append(container);
}

function inputCheck(){
    if(document.getElementById("cpuModel").value !== "-" && document.getElementById("gpuModel").value !== "-" && document.getElementById("ramModel").value !== "-" && document.getElementById("storageModel").value !== "-"){
        return true;
    }else{
        alert("Please fill out this form!");
    }
}

function getBrand(part){
    document.getElementById(config.parentId).querySelectorAll("#" + part + "Model")[0].innerHTML = `<option selected>-</>`;
    let value = document.getElementById(part).value;
    createModelMenu(part, value);
}

function createPart(part){
    let selectedPart = document.getElementById(config.parentId).querySelectorAll("." + part)[document.getElementById(part + "Model").selectedIndex-1]
    let currPart = new Part(part, document.getElementById(part).value, selectedPart.innerText, selectedPart.getAttribute("benchmark"));
    config.currPart[part] = currPart;
}

function createSelectMenu(part){
    let list = [];
    fetch(config.url + part).then(responce => responce.json()).then(function(data){
        for(let item in data){
            if(!(list.includes(data[item].Brand))){
                list.push(data[item].Brand);
        }
    }
    //console.log(list);
    let container = document.getElementById(config.parentId).querySelectorAll("#"+part)[0]

    for(let i=0; i<list.length; i++){
        let option = document.createElement("option");
        option.value = list[i];
        option.innerText = list[i];
        container.append(option);
    }
    document.getElementById(config.parentId).querySelectorAll("#"+part)[0].append(container);
    })
}

function createSelectRamMenu(part, num){
    let list = [];
    fetch(config.url + part).then(responce => responce.json()).then(function(data){
        for(let item in data){
            if(data[item].Model.toString().split(" ").pop()[0] !== num){
                continue
            }
            if(!(list.includes(data[item].Brand))){
                list.push(data[item].Brand);
        }
    }
    //console.log(list);
    let container = document.getElementById(config.parentId).querySelectorAll("#"+part+"Brand")[0]

    for(let i=0; i<list.length; i++){
        let option = document.createElement("option");
        option.value = list[i];
        option.innerText = list[i];
        container.append(option);
    }
    document.getElementById(config.parentId).querySelectorAll("#"+part+"Brand")[0].append(container);
    })
}

function createSelectStorageMenu(part){
    let list = [];
    fetch(config.url + part).then(responce => responce.json()).then(function(data){
        for(let item in data){
            let stringList = data[item].Model.split(" ");
            for(let i=0; i<stringList.length; i++){
                if(stringList[i].search(/TB|GB/) !== -1 && !(list.includes(stringList[i]))){
                    list.push(stringList[i]);
                }
            }
        }
    list = sortList(list)
    let container = document.getElementById(config.parentId).querySelectorAll("#"+"storageSize")[0]

    for(let i=0; i<list.length; i++){
        let option = document.createElement("option");
        option.value = list[i];
        option.innerText = list[i];
        container.append(option);
    }
    document.getElementById(config.parentId).querySelectorAll("#"+"storageSize")[0].append(container);
    })
}

function createStorageBrandMenu(storageType, storageSize){
    let list = [];
    fetch(config.url + storageType).then(responce => responce.json()).then(function(data){
        for(let item in data){
            let stringList = data[item].Model.split(" ");
            for(let i=0; i<stringList.length; i++){
                if(stringList[i] !== storageSize){
                    continue;
                }
                if(!(list.includes(data[item].Brand))){
                    list.push(data[item].Brand);
                }
            }
        }
    let container = document.getElementById(config.parentId).querySelectorAll("#"+"storageBrand")[0]

    for(let i=0; i<list.length; i++){
        let option = document.createElement("option");
        option.value = list[i];
        option.innerText = list[i];
        container.append(option);
    }
    document.getElementById(config.parentId).querySelectorAll("#"+"storageBrand")[0].append(container);
    });
}

function createModelMenu(part, brand){
    let list = [];
    fetch(config.url + part).then(responce => responce.json()).then(function(data){
        for(let item in data){
            if(data[item].Brand === brand){
                list.push(data[item]);
            }
        }
        //console.log(list);
        let container = document.getElementById(config.parentId).querySelectorAll("#"+part+"Model")[0]

        for(let i=0; i<list.length; i++){
            let option = document.createElement("option");
            option.classList.add(part)
            option.value = i;
            option.setAttribute("benchmark", list[i].Benchmark);
            option.innerText = list[i].Model;
            container.append(option);
        }
        document.getElementById(config.parentId).querySelectorAll("#"+part+"Model")[0].append(container);
    })
}

function createRamModelMenu(part, brand, num){
    let list = [];
    fetch(config.url + part).then(responce => responce.json()).then(function(data){
        for(let item in data){
            if(data[item].Model.toString().split(" ").pop()[0] !== num){
                continue;
            }
            if(data[item].Brand === brand){
                list.push(data[item]);
            }
        }
        //console.log(list);
        let container = document.getElementById(config.parentId).querySelectorAll("#"+part+"Model")[0]

        for(let i=0; i<list.length; i++){
            let option = document.createElement("option");
            option.classList.add(part)
            option.value = i;
            option.setAttribute("benchmark", list[i].Benchmark);
            option.innerText = list[i].Model;
            container.append(option);
        }
        document.getElementById(config.parentId).querySelectorAll("#"+part+"Model")[0].append(container);
    })
}

function createStorageModelMenu(storageType, storageSize, storageBrand){
    let list = [];
    fetch(config.url + storageType).then(responce => responce.json()).then(function(data){
        for(let item in data){
            let stringList = data[item].Model.split(" ");
            for(let i=0; i<stringList.length; i++){
                if(stringList[i] !== storageSize){
                    continue;
                }
                if(data[item].Brand !== storageBrand){
                    continue;
                }
                if(!(list.includes(data[item].Model))){
                    list.push(data[item]);
                }
            }
        }
        let container = document.getElementById(config.parentId).querySelectorAll("#storageModel")[0]

        for(let i=0; i<list.length; i++){
            let option = document.createElement("option");
            option.classList.add(storageType)
            option.value = i;
            option.setAttribute("benchmark", list[i].Benchmark);
            option.innerText = list[i].Model;
            container.append(option);
        }
        document.getElementById(config.parentId).querySelectorAll("#storageModel")[0].append(container);
    })
}
function sortList(list){
    let gbList = []
    let tbList = []
    for(let i=0; i<list.length; i++){
        if(list[i].search("GB") !== -1){
            gbList.push(list[i].replace("GB", ""));
        }else if(list[i].search("TB") !== -1){
            tbList.push(list[i].replace("TB", ""));
        }
    }
    tbList.sort((a, b) => b - a);
    let mapTBList = tbList.map(x => x+"TB");
    gbList.sort((a, b) => b - a);
    let mapGBList = gbList.map(x => x+"GB");
    
    return mapTBList.concat(mapGBList);
}

document.getElementById(config.parentId).append(createPage());

/*
{
"Type": "CPU",
"Part Number": "BX80684I99900KS",
"Brand": "Intel",
"Model": "Core i9-9900KS",
"Rank": 1,
"Benchmark": 102
}

{
"Type": "GPU",
"Part Number": "",
"Brand": "Nvidia",
"Model": "RTX 3090",
"Rank": 1,
"Benchmark": 232
}

{
"Type": "RAM",
"Part Number": "F4-2400C14Q2-128GRK",
"Brand": "G.SKILL",
"Model": "Ripjaws 4 DDR4 2400 C14 8x16GB",
"Rank": 1,
"Benchmark": 122
}

{
"Type": "HDD",
"Part Number": "WD121KRYZ",
"Brand": "WD",
"Model": "Gold 12TB (2017)",
"Rank": 1,
"Benchmark": 111
}

{
"Type": "SSD",
"Part Number": "SSDPED1D280GASX",
"Brand": "Intel",
"Model": "900P Optane NVMe PCIe 280GB",
"Rank": 1,
"Benchmark": 441
}
*/