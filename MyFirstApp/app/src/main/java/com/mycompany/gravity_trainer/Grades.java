package com.mycompany.gravity_trainer;

import android.app.Activity;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.view.MenuItem;

public class Grades extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_grades);
        setTitle("Grade Conversions");
        SharedPreferences sp = getSharedPreferences("bg", 0);
        String hexaColor = sp.getString("hexa", "#FFFFFF"); //default color will be #FFFFFF
        getWindow().getDecorView().setBackgroundColor(Color.parseColor(hexaColor));
        ViewPagerAdapter adapter = new ViewPagerAdapter(this, imageArra);
        ViewPager myPager = (ViewPager) findViewById(R.id.myfivepanelpager);
        myPager.setAdapter(adapter);
        myPager.setCurrentItem(0);

    }

    private int imageArra[] = { R.drawable.boulder_grades, R.drawable.sport_grades};
/*
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_grades, menu);
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

}