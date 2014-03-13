(function (window) {
    define([], function () {
        return {
            // ////////////////////////////////////////////////////////////////////////
            // Start And Success State
            // ////////////////////////////////////////////////////////////////////////
            START_ENTRY : 10001,
            INNER_RETRY : 10003,
            START_PAGE : 0,
            IDENTIFY_SUCCESS : 1,  // final success state
            ADB_SUCCESS : 2,
            // ////////////////////////////////////////////////////////////////////////
            // User Canceled
            // ////////////////////////////////////////////////////////////////////////
            USER_CANCELED : -1,
            // ////////////////////////////////////////////////////////////////////////
            // All Failed State, lower than -1
            // ////////////////////////////////////////////////////////////////////////
            OFFLINE : -10,  // show offline page
            START_CDROM_FAILED : -11,  // show start cdrom failed page
            DOWNLOAD_DRIVER_FAILED : -14,  // show download driver failed page
            // some device could has those detail state, if ui don't need to show detail, could handle as INSTALL_DRIVER or INSTALL_DEIVER_FAILED
            INSTALL_DRIVER_PRE_FAILED : -16,  // show install pre driver failed page
            INSTALL_DRIVER_POST_FAILED : -17,  // show install post driver failed page
            ALL_STEP_SUCCESS_BUT_ADB_NOT_FOUND : -18,  // all success, bug failed.
            APK_INSTALL_FAILED : -19,  // install apk failed
            CONNECTION_FORWARD_FAILED : -23,  // forward connection port failed
            CONNECTION_IDENTIFY_FAILED : -24,  // identify device info failed
            STORAGE_INSUFFICIENT : -27,  // storage is insufficient
            NOT_ALLOW_INSTALL_APK : -32,  // used by snappea
            APK_INSTALL_CANCELED_BY_USER : -33,
            OFFLINE_OTHER : -40,
            // ////////////////////////////////////////////////////////////////////////
            // All Processing State, bigger than 1, lowwer than 100
            // ////////////////////////////////////////////////////////////////////////
            ADB_DEBUG_CLOSE : 10,  // show adb debug close page
            WINDOWS_LOADING_DRIVER : 12,  // show windows loading driver page
            DOWNLOADING_DRIVER : 13,  // show downing driver, inclding progress
            INSTALL_DRIVER : 14,  // show installing driver page
            // install and lunch apk
            APK_INSTALLING : 17,
            APK_UPDATING : 18,
            // create connection
            CONNECTION_FORWARDING : 21,
            CONNECTION_IDENTIFYING : 22,
            DRIVER_CONFLICT_VMWARE : 23,  // ?
            // Ask user if flashing device
            CHECK_IS_USER_WANTTED_REINSTALL_DRIVER : 25,
            // Huawei Mount
            HUAWEI_SD_CARD_MOUNTED : 27,
            // Install Driver User Canceled
            INSTALL_DRIVER_CANCELED : 28,
            // Should Restart PC to continue
            INSTALL_DRIVER_SUCCESS_BUT_SHOULD_RESTART : 29,
            INSTALL_DRIVER_UAC_CANCEL : 30,
            PUBLISHER_NOT_TRUSTED : 1037,
            DRIVERSIGN_VERIFY_FAILED : 1038,
            PHONE_POWEROFF : 36,  // some phone adb can be used when power off.
            ADB_SERVER_DONT_ACK : 37,  // adb server didn't ack, need to be killed.
            USB_DEVICE_MAY_BE_PLUGOUT : 39,
            RSA_DIALOG : 40,
            // ////////////////////////////////////////////////////////////////////////
            // All internal state, bigger than 100
            // ////////////////////////////////////////////////////////////////////////
            DEVICE_REMOVED : 100,
            ADB_NAME_READY : 101,  // show adb name success, and connect device
            INSTALL_DRIVER_SUCCESS : 104,  // Show install driver success page
            DOWNLOAD_DRIVER_SUCCESS : 105,
            APK_INSTALL_SUCCESS : 106,
            START_INSTALL_DRIVER : 150,
            FORWARD_APK_SUCCESS : 154,
            APK_UPDATE_SUCCESS : 156,
            ADB_NAME_NOT_FOUND : 157,
            ON_ADB_SUCCESS : 158,
            CONNECTING_WHEN_QUIT_WDJ : 159,
            START_CHECK_ADB_NAME : 160,
            START_INSTALL_APK : 161,
            START_FORWARD_APK : 162,
            START_IDENTIFY_APK : 163,
            REALY_INSTALL_APK : 164,
            REALY_INSTALL_APK_SUCCESS : 165,
            START_UPDATE_PROXY : 166,
            ADB_SERVER_KILL_SUCCESS : 167,  // kill other adb server success
            DEVICE_FOUND : 168,
            ASK_ALLOW_INSTALL_APK : 1000,  // used by snappea
            RECOVERY : 1029,  // Phone enter recovery mode
            ADB_SERVER_ERROR_WDJ : 1034,  // The inner state of adb server is error, which is provided by wdj.
            ADB_SERVER_ERROR_OTHER : 1035,  // The inner state of adb server is error, which is provided by other pc suite.
            ADB_SERVER_KILL_ERROR : 1036  // Kill adb process error
        };
    });
}(this));
