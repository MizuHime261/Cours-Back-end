function giaiPhuongTrinhBacHai(a, b, c){
    let deltac = b * b - 4 * a * c;
    let bString = b < 0 ? `- ${Math.abs(b)}` : `+ ${b}`;
    let cString = c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`;
    let equation = `${a}x<sup>2</sup> ${bString}x ${cString} = 0`;
    document.getElementById("result").innerHTML = `Phương trình: ${equation}`

    if(deltac > 0) {
        let x1 = (-b + Math.sqrt(deltac)) / (2 * a);
        let x2 = (-b - Math.sqrt(deltac)) / (2 * a);
        document.getElementById("result").innerHTML += `<br>Phương trình có 2 nghiệm phân biệt:<br> x1 = ${x1}<br> x2 = ${x2}`;
    }else if(deltac === 0) {
        let x = -b / (2 * a);
        document.getElementById("result").innerHTML += `<br>Phương trình có nghiệm kép x = ${x}`;
    } else {
        document.getElementById("result").innerHTML += `<br>Phương trình vô nghiệm (deltac < 0)`;
    }
}

function nhapSo(tenSo) {
    let so;
    do {
        so = prompt(`Nhập hệ số ${tenSo}:`);
        if (isNaN(so) || so === "") {
            alert("Vui lòng nhập một số hợp lệ!");
        } else {
            so = parseFloat(so);
        }
    } while (isNaN(so) || so === "");
    return so;
}

let a = nhapSo("a");
let b = nhapSo("b");
let c = nhapSo("c");

giaiPhuongTrinhBacHai(a, b, c);
