package com.mycompany.myfirstapp;

import android.content.SharedPreferences;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.RadioButton;
import android.widget.TextView;

public class Settings extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        SharedPreferences sp = getSharedPreferences("bg", 0);
        String hexaColor = sp.getString("hexa", "#FFFFFF"); //default color will be #FFFFFF
        getWindow().getDecorView().setBackgroundColor(Color.parseColor(hexaColor));
        if (!hexaColor.equals("#272822")) {
        TextView tv = (TextView) findViewById(R.id.noodles);
        tv.setTextColor(getResources().getColor(R.color.black));
            RadioButton light = (RadioButton)findViewById(R.id.radio_light);
            RadioButton dark = (RadioButton)findViewById(R.id.radio_dark);
            RadioButton blue = (RadioButton)findViewById(R.id.radio_blue);
            light.setTextColor(getResources().getColor(R.color.black));
            dark.setTextColor(getResources().getColor(R.color.black));
            blue.setTextColor(getResources().getColor(R.color.black));

    } else

    {
        TextView tv = (TextView) findViewById(R.id.noodles);
        tv.setTextColor(getResources().getColor(R.color.white));
        RadioButton light = (RadioButton)findViewById(R.id.radio_light);
        RadioButton dark = (RadioButton)findViewById(R.id.radio_dark);
        RadioButton blue = (RadioButton)findViewById(R.id.radio_blue);
        light.setTextColor(getResources().getColor(R.color.white));
        dark.setTextColor(getResources().getColor(R.color.white));
        blue.setTextColor(getResources().getColor(R.color.white));
    }
    }
/*
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_settings, menu);
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

    public void onRadioButtonClicked(View view) {
        // Is the button now checked?
        boolean checked = ((RadioButton) view).isChecked();

        // Check which radio button was clicked
        switch(view.getId()) {
            case R.id.radio_dark:
                if (checked) {
                    SharedPreferences sp = getSharedPreferences("bg", 0);
                    SharedPreferences.Editor editor = sp.edit();
                    editor.putString("hexa", "#272822");
                    editor.apply();
                    getWindow().getDecorView().setBackgroundColor(Color.parseColor("#272822"));
                    TextView tv = (TextView) findViewById(R.id.noodles);
                    tv.setTextColor(getResources().getColor(R.color.white));
                    RadioButton light = (RadioButton)findViewById(R.id.radio_light);
                    RadioButton dark = (RadioButton)findViewById(R.id.radio_dark);
                    RadioButton blue = (RadioButton)findViewById(R.id.radio_blue);
                    light.setTextColor(getResources().getColor(R.color.white));
                    dark.setTextColor(getResources().getColor(R.color.white));
                    blue.setTextColor(getResources().getColor(R.color.white));
                    break; }
            case R.id.radio_light:
                if (checked) {
                    SharedPreferences sp = getSharedPreferences("bg", 0);
                    SharedPreferences.Editor editor = sp.edit();
                    editor.putString("hexa", "#FFFFFF");
                    editor.apply();
                    getWindow().getDecorView().setBackgroundColor(Color.parseColor("#FFFFFF"));
                    TextView tv = (TextView) findViewById(R.id.noodles);
                    tv.setTextColor(getResources().getColor(R.color.black));
                    RadioButton light = (RadioButton)findViewById(R.id.radio_light);
                    RadioButton dark = (RadioButton)findViewById(R.id.radio_dark);
                    RadioButton blue = (RadioButton)findViewById(R.id.radio_blue);
                    light.setTextColor(getResources().getColor(R.color.black));
                    dark.setTextColor(getResources().getColor(R.color.black));
                    blue.setTextColor(getResources().getColor(R.color.black));
                    break; }
            case R.id.radio_blue:
                if (checked) {
                    SharedPreferences sp = getSharedPreferences("bg", 0);
                    SharedPreferences.Editor editor = sp.edit();
                    editor.putString("hexa", "#3E8EA8");
                    editor.apply();
                    getWindow().getDecorView().setBackgroundColor(Color.parseColor("#3E8EA8"));
                    TextView tv = (TextView) findViewById(R.id.noodles);
                    tv.setTextColor(getResources().getColor(R.color.black));
                    RadioButton light = (RadioButton)findViewById(R.id.radio_light);
                    RadioButton dark = (RadioButton)findViewById(R.id.radio_dark);
                    RadioButton blue = (RadioButton)findViewById(R.id.radio_blue);
                    light.setTextColor(getResources().getColor(R.color.black));
                    dark.setTextColor(getResources().getColor(R.color.black));
                    blue.setTextColor(getResources().getColor(R.color.black));
                    break; }
        }
    }
}
