// Grab X
const GRABX_1 = 8000;
const GRABX_2 = 7500;
const GRABX_3 = 7000;
const GRABX_WAIT = 2000;

// Grab SUV
const GRABSUV_1 = 9000;
const GRABSUV_2 = 8500;
const GRABSUV_3 = 8000;
const GRABSUV_WAIT = 3000;

// Grab BLACK
const GRABBLACK_1 = 10000;
const GRABBLACK_2 = 9500;
const GRABBLACK_3 = 9000;
const GRABBLACK_WAIT = 3500;

var stage1Fee = 0;
var stage2Fee = 0;
var stage3Fee = 0;
var total = 0;
var waitFee = 0;
var distance = 0;
var waitTime = 0;

document.getElementById("btnBill").disabled = true;

document.getElementById("btnCalculate").onclick = function () {
  var distance = document.getElementById("distance").value;
  var waitTime = document.getElementById("waitTime").value;
  var grabType = takeGrabType();
  var total;
  switch (grabType) {
    case "grabX":
      //   waitFee = caculateWaitFee(waitTime, GRABX_WAIT);
      //   if (0 <= distance && distance <= 1) {
      //     stage1Fee = distance * GRABX_1;
      //     total = stage1Fee + waitFee;
      //   } else if (1 < distance && distance <= 19) {
      //     stage1Fee = GRABX_1;
      //     stage2Fee = (distance - 1) * GRABX_2;
      //     total = stage1Fee + stage2Fee + waitFee;
      //   } else if (distance > 19) {
      //     stage1Fee = GRABX_1;
      //     stage2Fee = (19 - 1) * GRABX_2;
      //     stage3Fee = (distance - 19) * GRABX_3;
      //     waitFee = calcWaitFee(waitTime, GRABX);
      //     total = stage1Fee + stage2Fee + stage3Fee + waitwaitFee;
      //   }
      total = caculateTotalFee(distance, waitTime, GRABX_WAIT, GRABX_1, GRABX_2, GRABX_3);
      break;

    case "grabSUV":
      total = caculateTotalFee(distance, waitTime, GRABSUV_WAIT, GRABSUV_1, GRABSUV_2, GRABSUV_3);
      break;

    case "grabBlack":
      total = caculateTotalFee(distance, waitTime, GRABBLACK_WAIT, GRABBLACK_1, GRABBLACK_2, GRABBLACK_3);
      break;

    default:
      alert("Please choose a grab type!");
      break;
  }
  document.getElementById("divThanhTien").style.display = "block";
  document.getElementById("xuatTien").innerHTML = total;
  document.getElementById("btnBill").disabled = false;
};

function takeGrabType() {
  var grabX = document.getElementById("grabX");
  var grabSUV = document.getElementById("grabSUV");
  var grabBlack = document.getElementById("grabBlack");
  var grabType = "";

  if (grabX.checked) {
    grabType = "grabX";
  } else if (grabSUV.checked) {
    grabType = "grabSUV";
  } else if (grabBlack.checked) {
    grabType = "grabBlack";
  }
  return grabType;
}

function caculateWaitFee(waitTime, waitType) {
  var waitFee;
  if (waitTime >= 3) {
    waitFee = Math.floor(waitTime / 3) * waitType;
  } else {
    waitFee = 0;
  }
  return waitFee;
}

function caculateStage1Fee(distance, GRABTYPE_1) {
  var stage1Fee = distance * GRABTYPE_1;
  return stage1Fee;
}

function caculateStage2Fee(distance, GRABTYPE_2) {
  var stage2Fee = (distance - 1) * GRABTYPE_2;
  return stage2Fee;
}

function caculateStage3Fee(distance, GRABTYPE_3) {
  var stage3Fee = (distance - 19) * GRABTYPE_3;
  return stage3Fee;
}

function caculateTotalFee(distance, waitTime, waitType, GRABTYPE_1, GRABTYPE_2, GRABTYPE_3) {
  waitFee = caculateWaitFee(waitTime, waitType);
  if (0 <= distance && distance <= 1) {
    stage1Fee = caculateStage1Fee(distance, GRABTYPE_1);
    total = stage1Fee + waitFee;
  } else if (1 < distance && distance <= 19) {
    stage1Fee = caculateStage1Fee(1, GRABTYPE_1);
    stage2Fee = caculateStage2Fee(distance, GRABTYPE_2);
    total = stage1Fee + stage2Fee + waitFee;
  } else if (distance > 19) {
    stage1Fee = caculateStage1Fee(1, GRABTYPE_1);
    stage2Fee = caculateStage2Fee(18, GRABTYPE_2);
    stage3Fee = caculateStage3Fee(distance, GRABTYPE_3);
    total = stage1Fee + stage2Fee + stage3Fee + waitFee;
  }
  return total;
}

document.getElementById("btnBill").onclick = function () {
  var content = "";
  var distance = document.getElementById("distance").value;
  var waitTime = document.getElementById("waitTime").value;
  var grabType = takeGrabType();

  if (0 < distance && distance <= 1) {
    content += stage1FeeRow(distance, grabType, stage1Fee, GRABX_1, GRABSUV_1, GRABBLACK_1, content);
  } else if (1 < distance && distance <= 19) {
    content += stage2FeeRow(distance, grabType, stage2Fee, GRABX_2, GRABSUV_2, GRABBLACK_2, content);
  } else if (distance > 19) {
    content += stage3FeeRow(distance, grabType, stage3Fee, GRABX_3, GRABSUV_3, GRABBLACK_3, content);
  }

  content += waitTimeRow(grabType, waitTime, waitFee, GRABX_WAIT, GRABSUV_WAIT, GRABBLACK_WAIT, content);
  content += "<tr>";
  content += "<td>Tổng tiền</td>";
  content += "<td>" + total + "</td>";
  content += "</tr>";
  document.getElementById("tbody").innerHTML = content;
};

function stage1FeeRow(distance, grabType, stage1Fee, GRABX_1, GRABSUV_1, GRABBLACK_1, content) {
  var grabType1;
  switch (grabType) {
    case "grabX":
      grabType1 = GRABX_1;
      break;

    case "grabSUV":
      grabType1 = GRABSUV_1;
      break;

    case "grabBlack":
      grabType1 = GRABBLACK_1;
      break;

    default:
      break;
  }
  content = "<tr>";
  content += "<td>Km đầu tiên</td>";
  content += "<td>" + distance + "</td>";
  content += "<td>" + grabType1 + "</td>";
  content += "<td>" + stage1Fee + "</td>";
  content += "</tr>";

  return content;
}

function stage2FeeRow(distance, grabType, stage2Fee, GRABX_2, GRABSUV_2, GRABBLACK_2, content) {
  content += stage1FeeRow(1, grabType, stage1Fee, GRABX_1, GRABSUV_1, GRABBLACK_1, content);
  var grabType2;
  switch (grabType) {
    case "grabX":
      grabType2 = GRABX_2;
      break;

    case "grabSUV":
      grabType2 = GRABSUV_2;
      break;

    case "grabBlack":
      grabType2 = GRABBLACK_2;
      break;

    default:
      break;
  }
  content += "<tr>";
  content += "<td>Từ 1 đến 19 km</td>";
  content += "<td>" + (distance - 1) + "</td>";
  content += "<td>" + grabType2 + "</td>";
  content += "<td>" + stage2Fee + "</td>";
  content += "</tr>";

  return content;
}

function stage3FeeRow(distance, grabType, stage3Fee, GRABX_3, GRABSUV_3, GRABBLACK_3, content) {
  content += stage1FeeRow(1, grabType, stage1Fee, GRABX_1, GRABSUV_1, GRABBLACK_1, content);
  content += stage2FeeRow(18, grabType, stage2Fee, GRABX_2, GRABSUV_2, GRABBLACK_2, content);
  var grabType3;
  switch (grabType) {
    case "grabX":
      grabType3 = GRABX_3;
      break;

    case "grabSUV":
      grabType3 = GRABSUV_3;
      break;

    case "grabBlack":
      grabType3 = GRABBLACK_3;
      break;

    default:
      break;
  }

  content += "<tr>";
  content += "<td>Từ 19 km trở lên</td>";
  content += "<td>" + (distance - 19) + "</td>";
  content += "<td>" + grabType3 + "</td>";
  content += "<td>" + stage3Fee + "</td>";
  content += "</tr>";

  return content;
}

function waitTimeRow(grabType, waitTime, waitFee, GRABX_WAIT, GRABSUV_WAIT, GRABBLACK_WAIT, content) {
  var grabWait;
  switch (grabType) {
    case "grabX":
      grabWait = GRABX_WAIT;
      break;

    case "grabSUV":
      grabWait = GRABSUV_WAIT;
      break;

    case "grabBlack":
      grabWait = GRABBLACK_WAIT;
      break;

    default:
      break;
  }
  content += "<tr>";
  content += "<td>Thời gian chờ</td>";
  content += "<td>" + waitTime + "</td>";
  content += "<td>" + grabWait + "</td>";
  content += "<td>" + waitFee + "</td>";
  content += "</tr>";
  return content;
}
