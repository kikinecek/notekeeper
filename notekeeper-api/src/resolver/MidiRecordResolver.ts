import {
  MidiRecordInput
} from "../model/midiRecord/types"

import {
  User
} from "../model/user/types";

import MidiRecordService from "../service/MidiRecordService";

const storeMidiRecord = async ({ data }: { data: MidiRecordInput }, { user }: { user: User }) => 
  await MidiRecordService.storeMidiRecord(data, user)

const updateMidiRecord = async ({ midiRecord }: { midiRecord: MidiRecordInput }, { user }: { user: User }) =>
  await MidiRecordService.updateMidiRecord(midiRecord, user)

const deleteMidiRecord = async ({ midiRecordId }: { midiRecordId: number }, { user }: { user: User }) =>
  await MidiRecordService.deleteMidiRecord(midiRecordId, user)


const MidiRecordResolver = {
  storeMidiRecord,
  updateMidiRecord,
  deleteMidiRecord
}

export default MidiRecordResolver;