function giaiPhuongTrinhBacNhat(a, b) {
    let bString = b < 0 ? `- ${Math.abs(b)}` : `+ ${b}`;
    console.log(`Phương trình: ${a}x ${bString} = 0`);

    if (a === 0) {
        if (b === 0) {
            console.log("Phương trình vô số nghiệm");
        } else {
            console.log("Phương trình vô nghiệm");
        }
    } else {
        console.log(`Phương trình có nghiệm x = ${-b/a}`);
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

giaiPhuongTrinhBacNhat(a, b);