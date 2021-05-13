let y = 0
let x = 0
let TamanhoFrame = 0
basic.showLeds(`
    # . . . .
    . . . . .
    . . . . .
    # . . . .
    # # . . .
    `)
DFRobotMaqueenPlus.I2CInit()
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
basic.forever(function () {
    huskylens.request()
    if (huskylens.isLearned(1) && huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        TamanhoFrame = huskylens.readeBox(1, Content1.width) * huskylens.readeBox(1, Content1.height)
        x = huskylens.readeBox(1, Content1.xCenter)
        y = huskylens.readeBox(1, Content1.yCenter)
        if (x < 120) {
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 60)
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, 20)
        } else if (x > 200) {
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, 20)
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 60)
        } else if (TamanhoFrame > 36000) {
            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CCW, 70)
        } else if (y > 220) {
            DFRobotMaqueenPlus.mototStop(Motors.ALL)
        } else if (y < 20) {
            DFRobotMaqueenPlus.mototStop(Motors.ALL)
        } else {
            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 90)
        }
    } else {
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
    }
})
