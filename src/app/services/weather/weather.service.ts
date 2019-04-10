import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(public http: HttpClient) {}
  // 341fca4009f9a075fcddad882faf97f0

  getCityWeatherByName(
    city: string,
    metric: 'metric' | 'imperial' = 'metric'
  ): Subject<string> {
    const dataSub = new Subject<string>();
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=341fca4009f9a075fcddad882faf97f0`
      )
      .subscribe(
        data => {
          // tslint:disable-next-line:no-string-literal
          dataSub.next(data['weather']);
        },
        err => {
          console.log(err);
        }
      );
    return dataSub;
  }

  getCitiesWeathersByName(cities: Array<string>,  metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
  const citiesSubject = new Subject();
  cities.forEach((city) => {
    citiesSubject.next(
      this.http.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=341fca4009f9a075fcddad882faf97f0`
      )
    );
  });
  return citiesSubject;
  }

  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=341fca4009f9a075fcddad882faf97f0`
    ).subscribe(data => {
      dataSubject.next(data['weather'][0].main);
    });
    return dataSubject;
  }

  getCurrentTemp(
    city: string,
    metric: 'metric' | 'imperial' = 'metric'
  ): Subject<number> {
    const dataSub = new Subject<number>();
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=341fca4009f9a075fcddad882faf97f0`
      )
      .subscribe(
        (weather: any) => {
          dataSub.next(Math.round(Number(weather.main.temp)));
        }
      );
    return dataSub;
  }


  getCurrentHum(
    city: string,
    metric: 'metric' | 'imperial' = 'metric'
  ): Subject<number> {
    const dataSub = new Subject<number>();
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=341fca4009f9a075fcddad882faf97f0`
      )
      .subscribe(
        (weather: any) => {
          dataSub.next(Math.round(Number(weather.main.humidity)));
        }
      );
    return dataSub;
  }


  getCurrentWind(
    city: string,
    metric: 'metric' | 'imperial' = 'metric'
  ): Subject<number> {
    const dataSub = new Subject<number>();
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=341fca4009f9a075fcddad882faf97f0`
      )
      .subscribe(
        (weather: any) => {
          dataSub.next(Math.round(Number(weather.main.humidity)));
        }
      );
    return dataSub;
  }

  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=341fca4009f9a075fcddad882faf97f0`
    ).subscribe((weather: any) => {
      max = weather.list[0].main.temp;
      weather.list.forEach(value => {
        if (max < value.main.temp) {
          max = value.main.temp;
        }
      });
      dataSubject.next(Math.round(max));
    });
    return dataSubject;
  }


  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    let min: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=341fca4009f9a075fcddad882faf97f0`
    ).subscribe((weather: any) => {
      min = weather.list[0].main.temp;
      weather.list.forEach(value => {
        if (min > value.main.temp) {
          min = value.main.temp;
        }
      });
      dataSubject.next(Math.round(min));
    });
    return dataSubject;
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>> {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=341fca4009f9a075fcddad882faf97f0`
    ).subscribe((weather:any) => {
      dataSubject.next(weather.list);
    });
    return dataSubject;
  }

  // The End
}




