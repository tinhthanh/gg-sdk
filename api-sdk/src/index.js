/* Written by Amit Agarwal */

import { getGmailAliases, getGmailLabels } from './gmail';
import { sendmail } from './server/mail';
import { doGet } from './server/webapp';
import router from './server/controller/router';
import { createSixMinuteSchedule, runJob } from './gmail/createSixMinuteSchedule';
import {createTriggerRunSendSms, jobSendSms} from "./sendSMS/createTriggerRunSendSms";
import { syncBookingJob } from "./job/sync-booking.job";
import { syncWaitingTimeJob } from "./job/scan-waiting-time.job";
import { jobSyncProductKiotViet } from "./job/sync-product-kiot.job";

global.sendmail = sendmail;
global.doPost = router;
global.doGet = doGet;
global.getGmailLabels = getGmailLabels;
global.getGmailAliases = getGmailAliases;
global.createSixMinuteSchedule = createSixMinuteSchedule;
global.runJob = runJob;
global.createTriggerRunSendSms = createTriggerRunSendSms;
global.jobSendSms = jobSendSms;
global.syncBookingJob = syncBookingJob; // job sync booking firebase client to sheet

// sync kiot viet

global.syncWaitingTimeJob =  syncWaitingTimeJob;

global.jobSyncProductKiotViet = jobSyncProductKiotViet;
