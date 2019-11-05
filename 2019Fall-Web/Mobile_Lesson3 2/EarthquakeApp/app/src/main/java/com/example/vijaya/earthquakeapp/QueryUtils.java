package com.example.vijaya.earthquakeapp;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

public class QueryUtils {
    /**
     * Tag for the log messages
     */
    private static final String LOG_TAG = QueryUtils.class.getSimpleName();

    /**
     * Create a private constructor because no one should ever create a {@link QueryUtils} object.
     * This class is only meant to hold static variables and methods, which can be accessed
     * directly from the class name QueryUtils (and an object instance of QueryUtils is not needed).
     */
    private QueryUtils() {
    }

    /**
     * Query the USGS dataset and return a list of {@link Earthquake} objects.
     */
    public static List<Earthquake> fetchEarthquakeData2(String requestUrl) {
        // An empty ArrayList that we can start adding earthquakes to
        List<Earthquake> earthquakes = new ArrayList<>();

        //  URL object to store the url for a given string
        URL url = null;

        // A string to store the response obtained from rest call in the form of string
        String jsonResponse = "";
        StringBuilder stringBuilder = new StringBuilder();

        try {
            //TODO: 1. Create a URL from the requestUrl string and make a GET request to it
            url = new URL(requestUrl);

            //TODO: 2. Read from the Url Connection and store it as a string(jsonResponse)
            URLConnection urlConnection = url.openConnection();
            InputStreamReader inputStreamReader = new InputStreamReader(urlConnection.getInputStream());
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

            String inputLine = bufferedReader.readLine();
            while (inputLine != null) {
                stringBuilder.append(inputLine);
                inputLine = bufferedReader.readLine();
            }
            if (bufferedReader != null) {
                bufferedReader.close();
            }
            jsonResponse = stringBuilder.toString();

                /*TODO: 3. Parse the jsonResponse string obtained in step 2 above into JSONObject to extract the values of
                        "mag","place","time","url"for every earth quake and create corresponding Earthquake objects with them
                        Add each earthquake object to the list(earthquakes) and return it.
                */

            // create JSONObject for jasonResponse
            JSONObject jsonObject = new JSONObject(jsonResponse);

            // extract JSONArray with the value of features
            JSONArray jsonArray = jsonObject.getJSONArray("features");

            for (int i = 0; i < jsonArray.length(); i++) {
                // get each earthquake link in jsonArray.
                JSONObject jsonItem = jsonArray.getJSONObject(i);

                // extract JSONObject with the value of properties.
                JSONObject properties = jsonItem.getJSONObject("properties");

                //print out all earthquakes link.
                System.out.println(jsonItem);

                // extract the values of mag, place, time and url.
                double magnitude = properties.getDouble("mag");
                String place = properties.getString("place");
                long time = properties.getLong("time");
                String urls = properties.getString("url");

                // create new earthquake objects with magnitude, place, time, and urls
                Earthquake earthquake = new Earthquake(magnitude, place, time, urls);

                // add new link of earthquake to the earthquakes list.
                earthquakes.add(earthquake);
            }

            // Return the list of earthquakes

        } catch (Exception e) {
            Log.e(LOG_TAG, "Exception:  ", e);
        }
        // Return the list of earthquakes
        return earthquakes;
    }
}
