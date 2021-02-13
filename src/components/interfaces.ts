export interface IUserInput {
    SearchQuery: (string|null);
}
export interface CurrentInfo {
    cloud: number,
    condition: Condition,
    feelslike_c:number,
    gust_mph: number,
    humidity: number,
    pressure_mb: number,
    temp_c: number,
    uv: number,
    vis_km: number,
    wind_degree: number,
    wind_dir: string,
    wind_kph: number
}

export interface Condition {
    text: string,
    icon: string,
    code: number
}

export interface ForecastInfo{
    astro: Astro,
    day: Day,
    hour: Hour[],
    date:string
}

export interface Astro{
    moon_illumination: string,
    moon_phase: string,
    moonrise: string,
    moonset: string,
    sunrise: string,
    sunset: string
}

export interface Day{
    avghumidity: number,
    maxtemp_c: number,
    maxwind_kph: number,
    mintemp_c: number,
    uv: number
}

export interface Hour{
    chance_of_rain:number,
    chance_of_snow: number,
    cloud: number,
    condition: Condition,
    feelslike_c: number,
    temp_c: number,
    wind_degree: number,
    wind_kph: number,
    windchill_c: number,
    time: string
}

export interface LocationInfo {
    country: string,
    lat: number,
    localtime: string,
    lon: number,
    name: string
}

export interface IWEatherInformationProps {
    SearchQuery: (string|null);
}