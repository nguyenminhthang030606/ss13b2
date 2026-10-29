let passengers = [];

const availableSeats = [
    "12A", "12B", "12C",
    "13A", "13B", "13C",
    "14A", "14B", "14C"
];

function validateIdNumber(idNumber) {
    const cccdRegex = /^\d{12}$/;
    const passportRegex = /^[A-Za-z]\d{7,8}$/;

    return cccdRegex.test(idNumber) || passportRegex.test(idNumber);
}

function generateSeat(flightNumber) {
    for (let seat of availableSeats) {
        let isOccupied = passengers.some(
            passenger =>
                passenger.flightNumber === flightNumber &&
                passenger.seatNumber === seat
        );

        if (!isOccupied) {
            return seat;
        }
    }

    return null;
}

function findPassengerByPnr(pnrCode) {
    return passengers.find(
        passenger => passenger.pnrCode === pnrCode
    );
}

function addPassenger() {
    let pnrCode = prompt("Nhập mã PNR:");
    let passengerName = prompt("Nhập tên hành khách:");
    let idNumber = prompt("Nhập CCCD/Hộ chiếu:");
    let flightNumber = prompt("Nhập số hiệu chuyến bay:");

    if (
        !pnrCode ||
        !passengerName ||
        !idNumber ||
        !flightNumber
    ) {
        console.log("Không được để trống dữ liệu!");
        return;
    }

    if (!validateIdNumber(idNumber)) {
        console.log("CCCD hoặc hộ chiếu không hợp lệ!");
        return;
    }

    if (findPassengerByPnr(pnrCode)) {
        console.log("PNR đã tồn tại!");
        return;
    }

    let seatNumber = generateSeat(flightNumber);

    if (!seatNumber) {
        console.log("Chuyến bay đã hết ghế!");
        return;
    }

    passengers.push({
        pnrCode,
        passengerName,
        idNumber,
        flightNumber,
        seatNumber,
        isCheckedIn: true
    });

    console.log("Tiếp nhận hồ sơ thành công!");
    console.log("Ghế được cấp:", seatNumber);
}

function verifyPassenger() {
    let pnrCode = prompt("Nhập mã PNR:");

    let passenger = findPassengerByPnr(pnrCode);

    if (!passenger) {
        console.log("Không tìm thấy hành khách!");
        return;
    }

    console.log("\n===== KẾT QUẢ XÁC THỰC =====");
    console.log("PNR:", passenger.pnrCode);
    console.log("Tên:", passenger.passengerName);
    console.log("Giấy tờ:", passenger.idNumber);

    if (validateIdNumber(passenger.idNumber)) {
        console.log("Trạng thái xác thực: HỢP LỆ");
    } else {
        console.log("Trạng thái xác thực: KHÔNG HỢP LỆ");
    }
}

function printBoardingPass() {
    let pnrCode = prompt("Nhập mã PNR:");

    let passenger = findPassengerByPnr(pnrCode);

    if (!passenger) {
        console.log("Không tìm thấy hành khách!");
        return;
    }

    console.log("====================================");
    console.log("          BOARDING PASS");
    console.log("====================================");
    console.log("PNR        :", passenger.pnrCode);
    console.log("Hành khách :", passenger.passengerName);
    console.log("Chuyến bay :", passenger.flightNumber);
    console.log("Số ghế     :", passenger.seatNumber);
    console.log("Check-In   :", passenger.isCheckedIn);
    console.log("====================================");
}

function showPassengers() {
    if (passengers.length === 0) {
        console.log("Chưa có dữ liệu hành khách!");
        return;
    }

    console.table(passengers);
}

function main() {
    let choice;

    do {
        choice = Number(
            prompt(
                "===== HỆ THỐNG THỦ TỤC AN NINH =====\n" +
                "1. Tiếp nhận hồ sơ hành khách\n" +
                "2. Xác thực giấy tờ\n" +
                "3. In Boarding Pass\n" +
                "4. Danh sách hành khách\n" +
                "5. Thoát\n" +
                "Nhập lựa chọn:"
            )
        );

        switch (choice) {
            case 1:
                addPassenger();
                break;

            case 2:
                verifyPassenger();
                break;

            case 3:
                printBoardingPass();
                break;

            case 4:
                showPassengers();
                break;

            case 5:
                console.log("Thoát chương trình!");
                break;

            default:
                console.log("Lựa chọn không hợp lệ!");
        }
    } while (choice !== 5);
}

main();