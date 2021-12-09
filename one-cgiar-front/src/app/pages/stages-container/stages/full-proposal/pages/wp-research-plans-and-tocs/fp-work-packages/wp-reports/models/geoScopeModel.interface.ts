import { Region } from './regionModel.interface';
import { Country } from './countryModel.interface';
export interface GeoScope{
    countries:Country[]
    regions: Region[]
}