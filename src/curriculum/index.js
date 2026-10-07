import little from './littleShapers'
import explorers from './explorers'
import detectives from './detectives'
import masters from './masters'

export const BANDS = [little, explorers, detectives, masters]
export const getBand = id => BANDS.find(b => b.id === id)
