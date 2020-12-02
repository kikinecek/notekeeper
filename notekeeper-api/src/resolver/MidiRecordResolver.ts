import { signedIn } from "../middleware/sessionState";

import { MidiRecordInput } from "../model/midiRecord/types"
import { User } from "../model/user/types";

import * as MidiRecordService from "../service/MidiRecordService";

import { MidiRecordInputValidationSchema } from "../validatior/MidiRecordValidator";
import { RatingInputValidationSchema } from "../validatior/RatingValidator";

const storeMidiRecord = async ({ data }: { data: MidiRecordInput }, { user }: { user: User }) => {
  try {
    await MidiRecordInputValidationSchema.validateAsync(data, {abortEarly: false});

    return await MidiRecordService.storeMidiRecord(user, data);
  } catch (err) {
    console.log(err);

    throw err;
  }
}
const updateMidiRecord = async ({ data, midiRecordId }: { data: MidiRecordInput, midiRecordId: number }, { user }: { user: User }) => {
  try {
    await MidiRecordInputValidationSchema.validateAsync(data, {abortEarly: false});

    return await MidiRecordService.updateMidiRecord(user, midiRecordId, data);
  } catch (err) {
    console.log(err);

    throw err;
  }
}

const deleteMidiRecord = async ({ midiRecordId }: { midiRecordId: number }, { user }: { user: User }) =>
  await MidiRecordService.deleteMidiRecord(midiRecordId, user);

const updateMidiRecordRating = async ({ratingId, rating}: { ratingId: number, rating: number }, { user }: {user: User}) => {
  try {
    await RatingInputValidationSchema.validateAsync({ ratingId, rating }, {abortEarly: false});

    return await MidiRecordService.updateMidiRecordRating(user, ratingId, rating);  
  } catch (err) {
    console.log(err);

    throw err;
  }
}

const MidiRecordResolver = {
  storeMidiRecord: signedIn(storeMidiRecord),
  updateMidiRecord: signedIn(updateMidiRecord),
  deleteMidiRecord: signedIn(deleteMidiRecord),
  updateMidiRecordRating: signedIn(updateMidiRecordRating)
}

export default MidiRecordResolver;