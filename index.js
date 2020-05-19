var json = {
    "memory": [50, 20, 70, 100, 60],
    "process":  [
        {
        "size": 10,
        "time": 5
    },
    {
        "size": 60,
        "time": 3
    },
    {
        "size": 15,
        "time": 2
    },
    {
        "size": 80,
        "time": 2
    },
    {
        "size": 90,
        "time": 1
    },
    {
        "size": 20,
        "time": 7
    },
    {
        "size": 35,
        "time": 2
    },
    {
        "size": 40,
        "time": 1
    },
    {
        "size": 75,
        "time": 3
    },
    {
        "size": 10,
        "time": 5
    },
    {
        "size": 80,
        "time": 3
    },
    {
        "size": 10,
        "time": 1
    },
]
}
var text = 'Memory  Use     Pid     Free    Status\n'
var tmpData = {}
var tempVar = [];
const newState = (valve) =>{
    tmpData.size =  new Array(valve.length).fill(0)
    tmpData.stateType = new Array(valve.length).fill(0)
    tmpData.ID = new Array(valve.length).fill(0)
    tmpData.PID = new Array(valve.length).fill(null)
}
var checkZero = [];

const main = () =>{
    // json.memory.sort( (a, b) => {return a - b})
    
    newState([...json.memory])
    const body = document.getElementById('tbody')
    var load = 0
     for(let i = 0 ; i < json.process.length; i++){
            // let texts = '\n'
        json.process.forEach(( valve, ID)=>{
            
            if(valve.time > 0){
                tmpData.size.some( (size ,index) =>{
                    if( valve.time > 0 && valve.size <= json.memory[index] && tmpData.stateType[index] == 0 && tmpData.PID[index] == null){
                        // console.log(valve.time , valve.size ,'<=', json.memory[index] , tmpData.stateType[index] ,'=', 0 , tmpData.PID[index])
                        tmpData.size[index] = valve.size
                        tmpData.stateType[index] = valve.time
                        tmpData.PID[index] = ID
                        tmpData.ID[index] = load++
                        json.process[ID].time = 0
                        show('A')
                        return true
                    }
                })
            }
            
         })
        
        tmpData.size.some((valve, index)=>{
            if(tmpData.stateType.toString() =='0,0,0,0,0'){
                return true
            }
            if(tmpData.stateType[index] > 0 ){
                tmpData.stateType[index]--
            }
            if(tmpData.stateType[index] == 0 ){
                // console.log(tempVar.indexOf(tmpData.stateType.toString()),tmpData.stateType)
                tmpData.stateType[index] = 0
                
                show('B')
                tmpData.size[index] = 0
                tmpData.PID[index] = null
                tmpData.ID[index] = 0
                // tempVar = tmpData.stateType    
            }
            
         })
        
     }
       
}
const show = (t) =>{
    
  
    let flag =0
    tmpData.size.forEach((a ,b) =>{
        if(tmpData.stateType[b]==0){
            flag++;
        }
        // FFF = `${Pad(tmpData.stateType[b]==0?'End':'Start')}`
    //     let PID = tmpData.PID[b]
    //    if(PID != null){
    //         if(json.process[PID].fq == tmpData.stateType[b]){
    //             flag = false;
    //         }
    //     // console.log(json.process[PID].fq, tmpData.stateType[b])
    //    }
    })
    checkZero.push(flag)
    if(checkZero[checkZero.length-1] !=  checkZero[checkZero.length-2]){
        let data = {}
        tmpData.size.forEach((a ,b) =>{
            
            tout = `${Pad(b+1)}${Pad(tmpData.size[b])}${Pad(tmpData.PID[b]+1)}${Pad(json.memory[b] - a)}${Pad(tmpData.stateType[b]==0?'End':'Start')}`
            if( a > 0  ){
                go = true
                // console.log(tempVar.indexOf(tout), tmpData.stateType)
                tempVar.push(tout)
                // fout += '=>'+ t +tmpData.stateType+'\n'
                // console.log(tmpData.size[b],tmpData.stateType[b])
                // console.log(a, tmpData.stateType[b])//==0?'End':'Start'
                data[tmpData.ID[b]] = tout
                // fout += `${Pad(b+1)}${Pad(tmpData.size[b])}${Pad(tmpData.PID[b]+1)}${Pad(json.memory[b] - a)}${Pad(tmpData.stateType[b]==0?'End':'Start')}\n`
            }
          
        })
        for(let i in data){
            if(data[i].indexOf('End') != -1){
               data[i  * tmpData.size.length + i] = data[i]
               delete data[i]
            }
        }
        for(let i in data){
            // console.log(data)
            text += data[i] + '\n'
        }

        
       
        // console.log(data)
        text += '\n'
    }
    // console.log(tmpData.stateType)

       
   
    
    
}
const Pad = (str) =>{ 
    str = str.toString(10)
    return	str.padEnd(8)
}
const out = () => {
    const body = document.getElementById('tbody')
    let round = document.createElement('tr')
    round.innerHTML = `<td colspan="6"></td>`
    
    tmpData.size.forEach(( val, ind)=>{
        body.appendChild(round)
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${ind+1}</td>
            <td>${tmpData.size[ind]}</td>
            <td>${tmpData.PID[ind]+1}</td>
            <td>${json.memory[ind] - val}</td>
            <td>${tmpData.stateType[ind]==0?'End':'Start'}</td>`
        if(tmpData.PID[ind] != null){
            text +=`${Pad(ind+1)}${Pad(tmpData.size[ind])}${Pad(tmpData.PID[ind]+1)}${Pad(json.memory[ind] - val)}${Pad(tmpData.stateType[ind]==0?'End':'Start')}\n`
            // body.appendChild(tr)
        }

        if(tmpData.stateType[ind] > 0 ){
            tmpData.stateType[ind]--
        }
        else if(tmpData.stateType[ind] == 0 ){
            tmpData.size[ind] = 0
            tmpData.PID[ind] = null
        }
        // console.log(`${ind}`,`Use ${val}`,`UID ${tmpData.PID[ind]}`, `free ${json.memory[ind] - val}` , tmpData.stateType[ind])
    })
    text +=`\n`
}
const Garbage = () =>{
    let max = Math.max.apply(Math,tmpData.stateType)// + tmpData.stateType.reduce( (prev, curr) => prev + curr )
   
    for(let i = 0; i <= max  ; i++){
        out();
    }
}
window.onload = () => {
    tempVar = []
    json.process.forEach(( valve, ID)=>{
        valve['id'] = ID
        valve['fq'] = valve['time']
    })
    main()
    console.log(text.slice(0,-4))
    download('out.txt',text.slice(0,-4))
}
const  download = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}