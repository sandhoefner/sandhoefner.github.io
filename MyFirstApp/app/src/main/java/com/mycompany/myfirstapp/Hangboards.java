package com.mycompany.myfirstapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

public class Hangboards extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hangboards);
        setTitle("Hangboard Logs");
        SharedPreferences sp = getSharedPreferences("bg", 0);
        String hexaColor = sp.getString("hexa", "#FFFFFF"); //default color will be #FFFFFF
        getWindow().getDecorView().setBackgroundColor(Color.parseColor(hexaColor));
    }
/*
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_hangboards, menu);
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

    public void beastmaker1000(View view) {
        // Do something in response to button
        Intent intent = new Intent(this, beastmaker1000.class);
//        EditText editText = (EditText) findViewById(R.id.edit_message);
//        String message = editText.getText().toString();
//        String message_final = "Nice to meet you, " + message + "!";
//        intent.putExtra(EXTRA_MESSAGE, message_final);
        startActivity(intent);
    }

    public void beastmaker2000(View view) {
        // Do something in response to button
        Intent intent = new Intent(this, beastmaker2000.class);
//        EditText editText = (EditText) findViewById(R.id.edit_message);
//        String message = editText.getText().toString();
//        String message_final = "Nice to meet you, " + message + "!";
//        intent.putExtra(EXTRA_MESSAGE, message_final);
        startActivity(intent);
    }

    public void ironPalm(View view) {
        // Do something in response to button
        Intent intent = new Intent(this, IronPalm.class);
//        EditText editText = (EditText) findViewById(R.id.edit_message);
//        String message = editText.getText().toString();
//        String message_final = "Nice to meet you, " + message + "!";
//        intent.putExtra(EXTRA_MESSAGE, message_final);
        startActivity(intent);
    }
}
