import axios from 'axios';
import { TopicInterface, CommentInterface } from '../interfaces'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

export async function getTopics(distance: string, latitude: number, longitude: number) {
  try {
    const { data }: { data: TopicInterface[] } = await instance.get('/topics', { params: { distance, latitude, longitude } })
    console.log(`${data.length} topics recieved`);
    return data
  } catch (e) {
    throw e;
  }
}

export async function getTopic(id: number) {
  try {
    const { data }: { data: TopicInterface } = await instance.get(`/topics/${id}`);
    return data
  } catch (e) {
    throw e;
  }
}

export async function getComments(topic_id: number) {
  try {
    const { data }: { data: CommentInterface[] } = await instance.get(`/topics/${topic_id}/comments`)
    return data
  } catch (e) {
    throw e;
  }
}