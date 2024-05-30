#! /usr/bin/env node
import { differenceInSeconds } from 'date-fns';
import inquirer from 'inquirer';
import chalk from 'chalk';

const durationInput = await inquirer.prompt({
    name: "usrInput",
    type: "number",
    message: chalk.yellow.bold("Enter the duration in seconds")
});

const durationInSeconds: number = durationInput.usrInput;

if (!isNaN(durationInSeconds)) {
    function startTime(): void {
        const inTime: Date = new Date();
        inTime.setSeconds(inTime.getSeconds() + durationInSeconds);
        const interval = setInterval(() => {
            const currentTime: Date = new Date();
            const timeDiff: number = differenceInSeconds(inTime, currentTime);
            const min: number = Math.floor((timeDiff % (3600 * 24)) / 60);
            const sec: number = Math.floor(timeDiff % 60);
            console.log(`${min}:${sec}`);
            if (timeDiff <= 0) {
                console.log(chalk.redBright.underline("Timer has expired"));
                clearInterval(interval);
            }
        }, 1000);
    }
    startTime();
} else {
    console.log(chalk.red("Please enter a valid number."));
}
