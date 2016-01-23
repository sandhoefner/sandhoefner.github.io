package com.mycompany.myfirstapp;

import android.content.SharedPreferences;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

public class Stopwatch extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setTitle("Deadhang Timer");
        SharedPreferences sp = getSharedPreferences("bg", 0);
        String hexaColor = sp.getString("hexa", "#FFFFFF"); //default color will be #FFFFFF
        getWindow().getDecorView().setBackgroundColor(Color.parseColor(hexaColor));
        // deal with this later
        /*
        if (!hexaColor.equals("#272822")) {
            TextView tv = (TextView) findViewById(R.id.noodles);
            tv.setTextColor(getResources().getColor(R.color.black));
        } else

        {
            TextView tv = (TextView) findViewById(R.id.noodles);
            tv.setTextColor(getResources().getColor(R.color.white));
            */
        setContentView(R.layout.activity_stopwatch);

        Spinner repView = (Spinner) findViewById(R.id.repSpin);
        // Create an adapter from the string array resource and use android's inbuilt layout file
        // simple_spinner_item that represents the default spinner in the UI
        ArrayAdapter adapter = ArrayAdapter.createFromResource(this, R.array.rep, android.R.layout.simple_spinner_item);
        // Set the layout to use for each dropdown item
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        repView.setAdapter(adapter);

        Spinner restView = (Spinner) findViewById(R.id.restSpin);
        // Create an adapter from the string array resource and use android's inbuilt layout file
        // simple_spinner_item that represents the default spinner in the UI
        ArrayAdapter adapter2 = ArrayAdapter.createFromResource(this, R.array.rest, android.R.layout.simple_spinner_item);
        // Set the layout to use for each dropdown item
        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        restView.setAdapter(adapter2);

        Spinner hangView = (Spinner) findViewById(R.id.hangSpin);
        // Create an adapter from the string array resource and use android's inbuilt layout file
        // simple_spinner_item that represents the default spinner in the UI
        ArrayAdapter adapter3 = ArrayAdapter.createFromResource(this, R.array.hang, android.R.layout.simple_spinner_item);
        // Set the layout to use for each dropdown item
        adapter3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        hangView.setAdapter(adapter3);

    }
/*
    @Override

    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_stopwatch, menu);
        return true;
    }
    */

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }



    public void crush(View view) {

        Spinner rep = (Spinner) findViewById(R.id.repSpin);
        String repText = rep.getSelectedItem().toString();
        int repInt = Integer.parseInt(repText);

        Spinner rest = (Spinner) findViewById(R.id.restSpin);
        String restText = rest.getSelectedItem().toString();
        int restInt = Integer.parseInt(restText);

        Spinner hang = (Spinner) findViewById(R.id.hangSpin);
        String hangText = hang.getSelectedItem().toString();
        int hangInt = Integer.parseInt(hangText);

        toast(hangText + " on, " + restText + " off for " + repText + " reps");
    }

    public void toast (String msg)
    {
        Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();
    } // end toast
}
